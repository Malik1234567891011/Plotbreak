import type {
  StoryDraft,
  GameEvent,
  GameState,
  LedgerEntry,
  MemoryFact,
  StoryVersion,
  TurnRecord,
} from '@plotbreak/contracts';
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import type {
  IdempotencyRecord,
  ReportRecord,
  ModerationQueueItem,
  ClientErrorRecord,
  ClientErrorGroup,
  Repository,
  SessionRecord,
  StoryComment,
  StoryEditorial,
  StorySignals,
  UserBadgeRow,
  UserRecord,
  PureMessage,
} from './types.js';
import { AUTO_HIDE_REPORTS } from './types.js';

/**
 * In-process repository.
 *
 * The default in development so `npm run api` needs no database, and the backing
 * store for the test suite. It enforces the same invariants the Postgres
 * implementation must — notably the optimistic-concurrency check in `saveState`
 * and idempotency-key uniqueness — so tests written against it are meaningful.
 *
 * State is deep-cloned on read and write so a caller mutating a returned object
 * cannot corrupt the store, which is what a real database would give us for free.
 */
/** How far back a player can fork. Older snapshots are dropped. */
const MAX_SNAPSHOTS = 60;

export class MemoryRepository implements Repository {
  readonly #stories = new Map<string, StoryVersion>();
  readonly #signals = new Map<string, StorySignals>();
  readonly #users = new Map<string, UserRecord>();
  readonly #sessions = new Map<string, SessionRecord>();
  readonly #states = new Map<string, GameState>();
  readonly #snapshots = new Map<string, Map<number, GameState>>();
  readonly #turns = new Map<string, TurnRecord[]>();
  readonly #turnsById = new Map<string, TurnRecord>();
  readonly #pureMessages = new Map<string, PureMessage[]>();
  readonly #events = new Map<string, GameEvent[]>();
  readonly #memories = new Map<string, MemoryFact[]>();
  readonly #ledger = new Map<string, LedgerEntry[]>();
  readonly #idempotency = new Map<string, IdempotencyRecord>();
  readonly #saves = new Map<string, Set<string>>();
  readonly #hides = new Map<string, Set<string>>();
  readonly #blocks = new Map<string, Set<string>>();
  readonly #reports = new Map<string, ReportRecord[]>();
  readonly #drafts = new Map<string, StoryDraft>();
  /** Which worlds are reachable from Discover. Absent means official, i.e. public. */
  readonly #visibility = new Map<string, 'PRIVATE' | 'UNLISTED' | 'PUBLIC'>();
  /** Worlds taken down by moderation, and why. */
  readonly #removed = new Map<string, string>();

  constructor(stories: readonly StoryVersion[] = [...LAUNCH_CATALOG]) {
    // Seeded so a fresh install shows a plausible catalog rather than a wall of
    // zeroes, and varied so the ranking has something real to sort on. Replaced
    // by the offline rollup job in production.
    const seeded: Record<string, StorySignals> = {
      story_ninth_archive: { runs: 12_400, likes: 5_460, saves: 3_910, hides: 61, reports: 3, impressions: 86_000 },
      story_understudy: { runs: 7_850, likes: 2_610, saves: 1_720, hides: 44, reports: 1, impressions: 51_000 },
      story_salt_road: { runs: 4_120, likes: 1_190, saves: 880, hides: 96, reports: 5, impressions: 38_000 },
    };

    for (const story of stories) {
      this.#stories.set(story.id, story);
      this.#signals.set(
        story.storyId,
        seeded[story.storyId] ?? { runs: 0, likes: 0, saves: 0, hides: 0, reports: 0, impressions: 0 },
      );
    }
  }

  // --- Catalog ---

  async listStories(): Promise<StoryVersion[]> {
    // Discover, not "every row". A creator's own draft-published world is
    // reachable by id and must not appear here until they say so.
    return [...this.#stories.values()].filter(
      (story) => (this.#visibility.get(story.storyId) ?? 'PUBLIC') === 'PUBLIC',
    );
  }

  async getStoryVersion(storyVersionId: string): Promise<StoryVersion | null> {
    return this.#stories.get(storyVersionId) ?? null;
  }

  async getStoryByStoryId(storyId: string): Promise<StoryVersion | null> {
    // Published versions are immutable, so "the story" is its highest version.
    const versions = [...this.#stories.values()]
      .filter((s) => s.storyId === storyId)
      .sort((a, b) => b.version - a.version);
    return versions[0] ?? null;
  }

  async getSignals(storyId: string): Promise<StorySignals> {
    return (
      this.#signals.get(storyId) ?? {
        runs: 0, likes: 0, saves: 0, hides: 0, reports: 0, impressions: 0,
      }
    );
  }

  async getSignalsFor(storyIds: readonly string[]): Promise<Map<string, StorySignals>> {
    return new Map(await Promise.all(storyIds.map(async (id) => [id, await this.getSignals(id)] as const)));
  }

  async bumpSignal(storyId: string, key: keyof StorySignals, delta: number): Promise<void> {
    const signals = await this.getSignals(storyId);
    signals[key] = Math.max(0, signals[key] + delta);
    this.#signals.set(storyId, signals);
  }

  // --- Likes, comments, editorial, badges ---
  //
  // The in-memory repository exists so the whole product runs with no database
  // at all — `npm run smoke`, the specs, and a laptop on a train. These are
  // plain maps with the same semantics as the SQL: idempotent likes, soft
  // deletes, claim-once badges.

  #likes = new Map<string, Set<string>>();
  #comments: StoryComment[] = [];
  #deletedComments = new Set<string>();
  #commentLikes = new Map<string, Set<string>>();
  #commentReports = new Set<string>();
  #cases: ModerationQueueItem[] = [];
  #clientErrors: ClientErrorRecord[] = [];
  #resolved = new Set<string>();
  #editorial: StoryEditorial[] = [];
  #badges = new Map<string, UserBadgeRow>();

  async setLiked(userId: string, storyId: string, liked: boolean): Promise<boolean> {
    const set = this.#likes.get(storyId) ?? new Set<string>();
    this.#likes.set(storyId, set);
    if (liked) {
      if (set.has(userId)) return false;
      set.add(userId);
      return true;
    }
    return set.delete(userId);
  }

  async getLikes(userId: string): Promise<string[]> {
    return [...this.#likes.entries()].filter(([, set]) => set.has(userId)).map(([id]) => id);
  }

  async countLikes(storyIds: readonly string[]): Promise<Map<string, number>> {
    return new Map(
      storyIds.map((id) => [
        id,
        (this.#signals.get(id)?.likes ?? 0) + (this.#likes.get(id)?.size ?? 0),
      ]),
    );
  }

  async listComments(storyId: string, sort: 'TOP' | 'NEW', limit: number): Promise<StoryComment[]> {
    const live = this.#comments.filter(
      (c) => c.storyId === storyId && !this.#deletedComments.has(c.commentId),
    );
    const sorted = [...live].sort((a, b) =>
      sort === 'TOP' ? b.likes - a.likes : b.createdAt.localeCompare(a.createdAt),
    );
    return sorted.slice(0, limit);
  }

  async countComments(storyIds: readonly string[]): Promise<Map<string, number>> {
    return new Map(
      storyIds.map((id) => [
        id,
        this.#comments.filter((c) => c.storyId === id && !this.#deletedComments.has(c.commentId))
          .length,
      ]),
    );
  }

  async addComment(comment: StoryComment): Promise<void> {
    this.#comments.push(comment);
  }

  async deleteComment(commentId: string, userId: string): Promise<boolean> {
    const found = this.#comments.find((c) => c.commentId === commentId && c.userId === userId);
    if (!found || this.#deletedComments.has(commentId)) return false;
    this.#deletedComments.add(commentId);
    return true;
  }

  async setCommentLiked(userId: string, commentId: string, liked: boolean): Promise<boolean> {
    const set = this.#commentLikes.get(commentId) ?? new Set<string>();
    this.#commentLikes.set(commentId, set);
    const changed = liked ? (set.has(userId) ? false : (set.add(userId), true)) : set.delete(userId);
    if (changed) {
      const index = this.#comments.findIndex((c) => c.commentId === commentId);
      const current = this.#comments[index];
      if (current) {
        this.#comments[index] = { ...current, likes: Math.max(0, current.likes + (liked ? 1 : -1)) };
      }
    }
    return changed;
  }

  async likedCommentIds(userId: string, storyId: string): Promise<string[]> {
    return this.#comments
      .filter((c) => c.storyId === storyId && this.#commentLikes.get(c.commentId)?.has(userId))
      .map((c) => c.commentId);
  }

  async reportComment(reportId: string, commentId: string, reporterId: string): Promise<boolean> {
    this.#commentReports.add(`${commentId}:${reporterId}`);
    const reporters = [...this.#commentReports].filter((k) => k.startsWith(`${commentId}:`)).length;
    if (reporters < AUTO_HIDE_REPORTS) return false;
    if (this.#deletedComments.has(commentId)) return false;
    this.#deletedComments.add(commentId);
    this.#cases.push({
      kind: 'CASE',
      id: `case_${this.#cases.length + 1}`,
      subjectType: 'COMMENT',
      subjectId: commentId,
      detail: this.#comments.find((c) => c.commentId === commentId)?.body ?? '',
      reports: reporters,
      createdAt: new Date().toISOString(),
    });
    return true;
  }

  async restoreComment(commentId: string): Promise<void> {
    this.#deletedComments.delete(commentId);
    for (const c of this.#cases) if (c.subjectId === commentId) this.#resolved.add(c.id);
  }

  async listModerationQueue(limit = 100): Promise<ModerationQueueItem[]> {
    const reports: ModerationQueueItem[] = [...this.#reports.values()].flat()
      .filter((r) => r.status === 'OPEN')
      .map((r) => ({
        kind: 'REPORT' as const,
        id: r.reportId,
        subjectType: r.targetType,
        subjectId: r.targetId,
        detail: r.details ? `${r.reason} — ${r.details}` : r.reason,
        reports: 1,
        createdAt: r.createdAt,
      }));
    return [...this.#cases, ...reports]
      .filter((i) => !this.#resolved.has(i.id))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit);
  }

  async resolveModeration(kind: 'CASE' | 'REPORT', id: string): Promise<void> {
    this.#resolved.add(id);
  }

  async countRecentComments(userId: string, since: Date): Promise<number> {
    return this.#comments.filter((c) => c.userId === userId && c.createdAt >= since.toISOString())
      .length;
  }

  async getEditorial(): Promise<StoryEditorial[]> {
    return [...this.#editorial];
  }

  async getBadges(userId: string): Promise<UserBadgeRow[]> {
    return [...this.#badges.values()].filter((b) => b.userId === userId);
  }

  async upsertBadge(row: UserBadgeRow): Promise<void> {
    const key = `${row.userId}:${row.badgeId}`;
    const existing = this.#badges.get(key);
    this.#badges.set(key, {
      ...row,
      progress: Math.max(existing?.progress ?? 0, row.progress),
      // The first unlock is the one that happened.
      unlockedAt: existing?.unlockedAt ?? row.unlockedAt,
      claimedAt: existing?.claimedAt ?? row.claimedAt,
    });
  }

  async claimBadge(userId: string, badgeId: string, at: string): Promise<boolean> {
    const key = `${userId}:${badgeId}`;
    const existing = this.#badges.get(key);
    if (!existing?.unlockedAt || existing.claimedAt) return false;
    this.#badges.set(key, { ...existing, claimedAt: at });
    return true;
  }

  // --- Users ---

  async getUser(userId: string): Promise<UserRecord | null> {
    return this.#users.get(userId) ?? null;
  }

  async createUser(user: UserRecord): Promise<void> {
    this.#users.set(user.userId, user);
  }

  async updateUser(userId: string, patch: Partial<UserRecord>): Promise<UserRecord | null> {
    const user = this.#users.get(userId);
    if (!user) return null;
    const updated = { ...user, ...patch, settings: { ...user.settings, ...(patch.settings ?? {}) } };
    this.#users.set(userId, updated);
    return updated;
  }

  async deleteUser(userId: string): Promise<void> {
    this.#users.delete(userId);
    for (const [sessionId, session] of this.#sessions) {
      if (session.userId !== userId) continue;
      this.#sessions.delete(sessionId);
      this.#states.delete(sessionId);
      this.#turns.delete(sessionId);
      this.#events.delete(sessionId);
      this.#memories.delete(sessionId);
    }
    // Spec §31.6 — the ledger is append-only and retained for financial audit
    // even after a privacy deletion; the purge workflow handles it separately.
    this.#saves.delete(userId);
    this.#hides.delete(userId);
    this.#blocks.delete(userId);
    this.#reports.delete(userId);
  }

  // --- Sessions ---

  async createSession(record: SessionRecord, state: GameState): Promise<void> {
    this.#sessions.set(record.sessionId, record);
    this.#states.set(record.sessionId, structuredClone(state));
    this.#turns.set(record.sessionId, []);
    this.#events.set(record.sessionId, []);
    this.#memories.set(record.sessionId, []);
  }

  async getSession(sessionId: string): Promise<SessionRecord | null> {
    return this.#sessions.get(sessionId) ?? null;
  }

  async listSessions(userId: string): Promise<SessionRecord[]> {
    return [...this.#sessions.values()]
      .filter((s) => s.userId === userId)
      .sort((a, b) => b.lastPlayedAt.localeCompare(a.lastPlayedAt));
  }

  async updateSession(sessionId: string, patch: Partial<SessionRecord>): Promise<void> {
    const session = this.#sessions.get(sessionId);
    if (session) this.#sessions.set(sessionId, { ...session, ...patch });
  }

  async deleteSession(sessionId: string): Promise<void> {
    this.#sessions.delete(sessionId);
    this.#states.delete(sessionId);
    this.#turns.delete(sessionId);
    this.#events.delete(sessionId);
    this.#memories.delete(sessionId);
  }

  // --- Game state ---

  async getState(sessionId: string): Promise<GameState | null> {
    const state = this.#states.get(sessionId);
    return state ? structuredClone(state) : null;
  }

  /**
   * Spec §17.4 — compare-and-set on revision. Returns false rather than throwing
   * so the caller can turn a lost race into a 409 with the current revision.
   */
  async saveState(sessionId: string, expectedRevision: number, state: GameState): Promise<boolean> {
    const current = this.#states.get(sessionId);
    if (!current) return false;
    if (current.revision !== expectedRevision) return false;
    this.#states.set(sessionId, structuredClone(state));
    return true;
  }

  /**
   * Spec §11.7 — the state each turn started from, so a fork can return to it.
   *
   * Capped: a long run would otherwise keep every snapshot it ever made, and
   * the ones a player can fork to are the ones they can still see.
   */
  async putStateSnapshot(sessionId: string, turnIndex: number, state: GameState): Promise<void> {
    const snapshots = this.#snapshots.get(sessionId) ?? new Map<number, GameState>();
    snapshots.set(turnIndex, structuredClone(state));

    if (snapshots.size > MAX_SNAPSHOTS) {
      const oldest = [...snapshots.keys()].sort((a, b) => a - b).slice(0, snapshots.size - MAX_SNAPSHOTS);
      for (const key of oldest) snapshots.delete(key);
    }
    this.#snapshots.set(sessionId, snapshots);
  }

  async getStateSnapshot(sessionId: string, turnIndex: number): Promise<GameState | null> {
    const state = this.#snapshots.get(sessionId)?.get(turnIndex);
    return state ? structuredClone(state) : null;
  }

  // --- Turns and events ---

  /** Insert-only, like the append-only `turns` table it stands in for. */
  async appendTurn(turn: TurnRecord): Promise<void> {
    if (this.#turnsById.has(turn.turnId)) return;
    const list = this.#turns.get(turn.sessionId) ?? [];
    list.push(turn);
    this.#turns.set(turn.sessionId, list);
    this.#turnsById.set(turn.turnId, turn);
  }

  async getTurn(turnId: string): Promise<TurnRecord | null> {
    return this.#turnsById.get(turnId) ?? null;
  }

  async replaceNarration(
    turnId: string,
    narration: {
      blocks: TurnRecord['blocks'];
      sceneSummary: string;
      endStatePrompt: string;
      stateDeltas: TurnRecord['stateDeltas'];
    },
  ): Promise<void> {
    const turn = this.#turnsById.get(turnId);
    if (!turn) return;
    const updated: TurnRecord = { ...turn, ...narration };
    this.#turnsById.set(turnId, updated);
    this.#turns.set(
      turn.sessionId,
      (this.#turns.get(turn.sessionId) ?? []).map((t) => (t.turnId === turnId ? updated : t)),
    );
  }

  async attachHeroImage(turnId: string, url: string): Promise<void> {
    const turn = this.#turnsById.get(turnId);
    if (!turn) return;
    const updated: TurnRecord = { ...turn, heroImageUrl: url };
    this.#turnsById.set(turnId, updated);
    const list = this.#turns.get(turn.sessionId) ?? [];
    this.#turns.set(
      turn.sessionId,
      list.map((t) => (t.turnId === turnId ? updated : t)),
    );
  }

  async listTurns(sessionId: string): Promise<TurnRecord[]> {
    return [...(this.#turns.get(sessionId) ?? [])];
  }

  async appendPureMessage(sessionId: string, turnIndex: number, message: PureMessage): Promise<void> {
    const list = this.#pureMessages.get(sessionId) ?? [];
    if (list[turnIndex]) return;
    list[turnIndex] = message;
    this.#pureMessages.set(sessionId, list);
  }

  async listPureMessages(sessionId: string): Promise<PureMessage[]> {
    // Holes would mean a turn was persisted without its message, which should
    // not happen; dropping them keeps the replay contiguous rather than sending
    // `undefined` into a prompt.
    return [...(this.#pureMessages.get(sessionId) ?? [])].filter(Boolean);
  }

  async appendEvents(events: readonly GameEvent[]): Promise<void> {
    for (const event of events) {
      const list = this.#events.get(event.sessionId) ?? [];
      list.push(event);
      this.#events.set(event.sessionId, list);
    }
  }

  async listEvents(sessionId: string): Promise<GameEvent[]> {
    return [...(this.#events.get(sessionId) ?? [])];
  }

  // --- Memory ---

  async listMemories(sessionId: string): Promise<MemoryFact[]> {
    return [...(this.#memories.get(sessionId) ?? [])];
  }

  async appendMemories(sessionId: string, facts: readonly MemoryFact[]): Promise<void> {
    const list = this.#memories.get(sessionId) ?? [];
    list.push(...facts);
    this.#memories.set(sessionId, list);
  }

  async replaceMemories(sessionId: string, facts: readonly MemoryFact[]): Promise<void> {
    this.#memories.set(sessionId, [...facts]);
  }

  async setMemoryPinned(sessionId: string, factId: string, pinned: boolean): Promise<MemoryFact | null> {
    const list = this.#memories.get(sessionId) ?? [];
    const index = list.findIndex((fact) => fact.factId === factId);
    if (index === -1) return null;
    const updated = { ...list[index]!, pinned };
    this.#memories.set(sessionId, list.map((fact, i) => (i === index ? updated : fact)));
    return updated;
  }

  // --- Wallet ---

  async listLedger(accountId: string): Promise<LedgerEntry[]> {
    return [...(this.#ledger.get(accountId) ?? [])];
  }

  async appendLedgerEntry(entry: LedgerEntry): Promise<void> {
    const list = this.#ledger.get(entry.accountId) ?? [];
    list.push(entry);
    this.#ledger.set(entry.accountId, list);
  }

  async findLedgerEntryByIdempotencyKey(accountId: string, key: string): Promise<LedgerEntry | null> {
    return (this.#ledger.get(accountId) ?? []).find((e) => e.idempotencyKey === key) ?? null;
  }

  // --- Idempotency ---

  async getIdempotency(key: string): Promise<IdempotencyRecord | null> {
    return this.#idempotency.get(key) ?? null;
  }

  async putIdempotency(record: IdempotencyRecord): Promise<void> {
    this.#idempotency.set(record.key, record);
  }

  async updateIdempotency(key: string, patch: Partial<IdempotencyRecord>): Promise<void> {
    const record = this.#idempotency.get(key);
    if (record) this.#idempotency.set(key, { ...record, ...patch });
  }

  // --- Social ---

  async getSaves(userId: string): Promise<string[]> {
    return [...(this.#saves.get(userId) ?? [])];
  }

  async setSaved(userId: string, storyId: string, saved: boolean): Promise<void> {
    const set = this.#saves.get(userId) ?? new Set<string>();
    if (saved) set.add(storyId);
    else set.delete(storyId);
    this.#saves.set(userId, set);
  }

  async getHidden(userId: string): Promise<string[]> {
    return [...(this.#hides.get(userId) ?? [])];
  }

  async setHidden(userId: string, storyId: string, hidden: boolean): Promise<void> {
    const set = this.#hides.get(userId) ?? new Set<string>();
    if (hidden) set.add(storyId);
    else set.delete(storyId);
    this.#hides.set(userId, set);
  }

  // --- Safety ---

  async recordClientError(error: ClientErrorRecord): Promise<void> {
    if (this.#clientErrors.some((e) => e.errorId === error.errorId)) return;
    this.#clientErrors.push(error);
  }

  async listClientErrorGroups(sinceHours: number, limit: number): Promise<ClientErrorGroup[]> {
    const cutoff = Date.now() - sinceHours * 3600_000;
    const groups = new Map<string, ClientErrorRecord[]>();
    for (const e of this.#clientErrors) {
      if (Date.parse(e.createdAt) < cutoff) continue;
      groups.set(e.fingerprint, [...(groups.get(e.fingerprint) ?? []), e]);
    }
    return [...groups.entries()]
      .map(([fingerprint, list]) => {
        const newest = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0]!;
        return {
          fingerprint,
          message: newest.message,
          screen: newest.screen,
          count: list.length,
          devices: new Set(list.map((e) => e.installId)).size,
          lastSeen: newest.createdAt,
          appVersions: [...new Set(list.map((e) => e.appVersion))].join(', '),
        };
      })
      .sort((a, b) => b.devices - a.devices || b.count - a.count)
      .slice(0, limit);
  }

  // --- Create mode ---

  async listDrafts(ownerId: string): Promise<StoryDraft[]> {
    return [...this.#drafts.values()]
      .filter((draft) => draft.ownerId === ownerId)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  async getDraft(draftId: string): Promise<StoryDraft | null> {
    return this.#drafts.get(draftId) ?? null;
  }

  async putDraft(draft: StoryDraft): Promise<void> {
    this.#drafts.set(draft.draftId, draft);
  }

  async deleteDraft(draftId: string, ownerId: string): Promise<boolean> {
    const draft = this.#drafts.get(draftId);
    if (!draft || draft.ownerId !== ownerId) return false;
    this.#drafts.delete(draftId);
    return true;
  }

  async publishDraft(input: {
    readonly draft: StoryDraft;
    readonly story: StoryVersion;
    readonly slug: string;
    readonly visibility: 'PRIVATE' | 'UNLISTED' | 'PUBLIC';
    readonly at: string;
  }): Promise<StoryDraft> {
    this.#stories.set(input.story.id, input.story);
    this.#visibility.set(input.story.storyId, input.visibility);
    if (!this.#signals.has(input.story.storyId)) {
      this.#signals.set(input.story.storyId, {
        runs: 0, likes: 0, saves: 0, hides: 0, reports: 0, impressions: 0,
      });
    }
    const next: StoryDraft = {
      ...input.draft,
      storyId: input.story.storyId,
      publishedVersionId: input.story.id,
      publishedAt: input.at,
      visibility: input.visibility,
      updatedAt: input.at,
    };
    this.#drafts.set(next.draftId, next);
    return next;
  }

  async removeStory(storyId: string, reason: string): Promise<boolean> {
    const known = [...this.#stories.values()].some((story) => story.storyId === storyId);
    if (!known) return false;
    this.#removed.set(storyId, reason);
    this.#visibility.set(storyId, 'PRIVATE');
    return true;
  }

  async restoreStory(storyId: string): Promise<boolean> {
    if (!this.#removed.has(storyId)) return false;
    this.#removed.delete(storyId);
    this.#visibility.set(storyId, 'PUBLIC');
    return true;
  }

  async setStoryVisibility(
    storyId: string,
    ownerId: string,
    visibility: 'PRIVATE' | 'UNLISTED' | 'PUBLIC',
  ): Promise<boolean> {
    const draft = [...this.#drafts.values()].find(
      (d) => d.storyId === storyId && d.ownerId === ownerId,
    );
    if (!draft) return false;
    this.#visibility.set(storyId, visibility);
    this.#drafts.set(draft.draftId, { ...draft, visibility });
    return true;
  }

  async createReport(report: ReportRecord): Promise<void> {
    const list = this.#reports.get(report.reporterUserId) ?? [];
    list.push(report);
    this.#reports.set(report.reporterUserId, list);
  }

  async listReports(userId: string): Promise<ReportRecord[]> {
    return [...(this.#reports.get(userId) ?? [])];
  }

  async listBlocks(userId: string): Promise<string[]> {
    return [...(this.#blocks.get(userId) ?? [])];
  }

  async setBlocked(userId: string, targetId: string, blocked: boolean): Promise<void> {
    const set = this.#blocks.get(userId) ?? new Set<string>();
    if (blocked) set.add(targetId);
    else set.delete(targetId);
    this.#blocks.set(userId, set);
  }
}
