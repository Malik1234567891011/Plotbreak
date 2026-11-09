/**
 * The `webnovel` prose style: what a story opts into with
 * `rules.proseStyle: 'webnovel'`.
 *
 * Why it exists: our beats were written like a literary novel — 200 to 370
 * words of interiority and "she explains" — for players who arrived from
 * manhwa and web fiction and write to the story like a chat. Two-thirds of new
 * players left within five turns. The craft behind these rules is in
 * `docs/craft/webnovel-openings.md`; read it before changing a line here.
 *
 * Only the prose paragraph of the constitution changes. Every rule about what
 * is true, who decides it and what the player chose is the same for every story.
 *
 * Measured on the openings that hook fastest (Shadow Slave, He Who Fights With
 * Monsters): a median paragraph of 11–12 words, half the paragraphs one line,
 * sentences around 10–11 words, a third or more of it dialogue.
 */

/** Replaces the classic prose paragraph. */
export const PROSE_WEBNOVEL = [
  'THIS STORY IS WRITTEN LIKE A WEB NOVEL OR A MANHWA, NOT A LITERARY NOVEL. The reader is on a phone,',
  'and a beat is one screen. It runs about 80-160 words: less for a quick exchange, more only when',
  'something genuinely large happens.',
  '',
  'SHORT LINES. One idea per paragraph. Most paragraphs are one or two sentences and many are a single',
  'line. Sentences are short and concrete. A line alone on the page is a panel: it lands harder than the',
  'same line buried in a paragraph, so the lines that matter get their own.',
  '',
  'PEOPLE TALK. A third of the beat or more is dialogue, and every line carries information and attitude',
  'at once. Never report speech ("she explains that...", "he tells you about..."). Let them say it, short,',
  'in their own voice. Speech sounds spoken: contractions, fragments, people cutting each other off.',
  'Nobody says "you are" where a real person would say "you\'re". The narration can use them too.',
  '',
  'START WITH WHAT THE PLAYER DID. The first line or two show their action landing: what it changed and',
  'who reacted. Do not restate it back to them. Then move.',
  '',
  'ONE CONCRETE THING. Every beat has something the player can point at: an object, a line someone said,',
  'a number, a look that means something. Not a mood. Setting gets a line, not a paragraph.',
  '',
  'THE WORLD ARRIVES WHEN IT IS NEEDED. At most one new name or rule per beat, said by somebody who wants',
  'something, in dialogue. Never a lecture, never a list.',
  '',
  'HOLD THE BIG QUESTION, PAY OUT SMALL ONES. The story\'s central question stays open for a long time.',
  'Each beat answers one small thing and opens another. A real twist is rare, and it lands because the',
  'beats around it made the player care about somebody. Never a twist every paragraph.',
  '',
  'CHANGE THE NOTE. Fear, then a joke. Tenderness, then a jab. Danger, then something petty and human.',
  'Characters are sharp, funny, specific and likeable. Nobody gives speeches.',
  '',
  'MEET THE PLAYER WHERE THEY ARE. If they write playfully, the world plays back before it turns. If they',
  'write one line, answer at their speed. If they flirt, somebody flirts back or shuts it down in',
  'character, never with a lecture.',
  '',
  'THE LAST LINE STANDS ALONE AND IT IS AIMED AT THE PLAYER. End where they have to decide: a question put',
  'to them, something within reach, a clock, a reveal they must answer, a touch. Never end on scenery, a',
  'summary, or a moment that has already closed, and do not end two beats in a row the same way. Not every',
  'ending is a cliffhanger. A calm beat can end on a smile and an offer, but it always hands the player',
  'something to do.',
  '',
  'SHORT IS NOT THIN. No trailer narration ("little did you know"), no shock happening to nobody, no',
  'breathless capitals. Every line is chosen and specific. The suggestions are short too: one sentence,',
  'about four to fourteen words, the way a player would actually type it.',
].join('\n');

/** The same brief, authored in French for French runs. */
export const PROSE_WEBNOVEL_FR = [
  '## STYLE DE CETTE HISTOIRE : WEB NOVEL, PAS ROMAN LITTÉRAIRE',
  'Cette consigne remplace toute indication de longueur ci-dessus. Le joueur lit sur un téléphone, et un',
  'beat tient sur un écran : environ 90 à 175 mots. Moins pour un échange rapide, plus seulement quand il',
  'se passe vraiment quelque chose de grand.',
  '',
  'DES LIGNES COURTES. Une idée par paragraphe. La plupart des paragraphes font une ou deux phrases, beaucoup',
  'une seule ligne. Phrases courtes et concrètes. Une ligne seule sur la page est une case de manhwa : elle',
  'frappe plus fort que la même phrase noyée dans un paragraphe.',
  '',
  'LES GENS PARLENT. Un tiers du beat ou plus est du dialogue, et chaque réplique porte une info et une',
  'attitude. Jamais de discours rapporté (« elle t’explique que… »). Ils le disent eux-mêmes, court, avec',
  'leur voix. Ça doit sonner parlé : phrases coupées, élisions familières quand le personnage parle comme',
  'ça (« t’es », « j’sais pas »), des gens qui se coupent la parole.',
  '',
  'COMMENCE PAR CE QUE LE JOUEUR A FAIT. Une ou deux lignes montrent son action qui porte : ce qu’elle change,',
  'qui réagit. Ne la lui répète pas. Puis avance.',
  '',
  'UNE CHOSE CONCRÈTE. Chaque beat contient quelque chose qu’on peut montrer du doigt : un objet, une',
  'réplique, un chiffre, un regard qui veut dire quelque chose. Pas une ambiance. Le décor tient en une ligne.',
  '',
  'LE MONDE ARRIVE QUAND ON EN A BESOIN. Au plus un nouveau nom ou une nouvelle règle par beat, dit par',
  'quelqu’un qui veut quelque chose, en dialogue. Jamais un exposé, jamais une liste.',
  '',
  'GARDE LA GRANDE QUESTION, PAIE LES PETITES. La question centrale reste ouverte longtemps. Chaque beat',
  'répond à une petite chose et en ouvre une autre. Un vrai retournement est rare, et il porte parce que les',
  'beats autour ont fait aimer quelqu’un. Jamais un twist par paragraphe.',
  '',
  'CHANGE DE NOTE. La peur, puis une blague. La tendresse, puis une pique. Le danger, puis quelque chose de',
  'mesquin et d’humain. Les personnages sont vifs, drôles, précis, attachants. Personne ne fait de discours.',
  '',
  'SUIS LE REGISTRE DU JOUEUR. S’il joue, le monde joue avec lui avant de basculer. S’il écrit une ligne,',
  'réponds à son rythme. S’il drague, quelqu’un drague en retour ou le recadre en restant dans son',
  'personnage, jamais avec une leçon.',
  '',
  'LA DERNIÈRE LIGNE EST SEULE ET ELLE VISE LE JOUEUR. Termine là où il doit décider : une question qu’on lui',
  'pose, quelque chose à portée de main, une échéance, une révélation qui exige une réponse, un contact. Jamais',
  'sur le décor, un résumé ou un moment déjà refermé, et jamais deux fins du même type d’affilée. Toutes les',
  'fins ne sont pas des cliffhangers : un beat calme peut finir sur un sourire et une offre, mais il donne',
  'toujours au joueur quelque chose à faire.',
  '',
  'COURT NE VEUT PAS DIRE PAUVRE. Pas de narration de bande-annonce (« tu ne le savais pas encore »), pas de',
  'choc qui n’arrive à personne, pas de majuscules haletantes. Chaque ligne est choisie et précise. Les',
  'suggestions sont courtes elles aussi : une phrase, de quatre à quinze mots environ, comme un joueur',
  'l’écrirait vraiment.',
].join('\n');

/**
 * What `reaction` means in this style. The face is drawn at the top of the
 * beat, the way a webtoon panel opens a scene, so it is chosen first and it
 * is the picture the beat is about.
 */
export const FACES_WEBNOVEL =
  `Set reaction FIRST, before you write the beat. It is drawn at the top of the beat, the way a manhwa ` +
  `panel opens a scene, so it is half of the storytelling: the character the player is facing as this ` +
  `beat opens, the one reacting to what they just did or the one the beat is about, with the expression ` +
  `they wear. Choose one on most beats that have a character in them. A new expression on the same face ` +
  `is a new panel and is worth showing; the identical face and expression twice running is not. When the ` +
  `story's lead is in the scene and the moment is theirs, show them. Null only when nobody is there or ` +
  `the beat is the player alone.`;

/**
 * Words per beat, by tier. Lower than the classic targets on purpose: a beat is
 * one screen on a phone, and the player's next move is the page turn.
 */
export const WEBNOVEL_WORDS = {
  QUICK: { low: 60, high: 120 },
  VIVID: { low: 80, high: 160 },
  CINEMATIC: { low: 110, high: 200 },
  APEX: { low: 130, high: 240 },
} as const;
