-- Removes the story versions published with a `calledName` character field the
-- deployed contract rejects. Each equals the version before it apart from that
-- field (Ace's also carries a cover-prompt rewording the repo fixture already
-- has). The four pinned sessions are guest test runs; they move to the
-- equivalent version. 2026-09-12.
--
-- A first pass already removed sv_ace_7, sv_ninth_archive_32, sv_red_moon_30,
-- sv_seven_days_30, sv_unbound_31, sv_window_seven_26 (exact duplicates of the
-- rows below). This is the second pass. Run it in the Supabase SQL editor:
-- https://supabase.com/dashboard/project/qscmokjkflkrspqjjooa/sql/new
--
-- Three separate statements, list repeated: the editor does not keep a temp
-- table between statements, and a single WITH runs its parts concurrently so
-- the delete's foreign-key check can fire before the repoint lands.

UPDATE stories s SET published_version_id = bad.prev
FROM (VALUES
  ('sv_ace_6',            'sv_ace_5'),
  ('sv_ninth_archive_31', 'sv_ninth_archive_30'),
  ('sv_red_moon_29',      'sv_red_moon_28'),
  ('sv_seven_days_29',    'sv_seven_days_28'),
  ('sv_unbound_30',       'sv_unbound_29'),
  ('sv_window_seven_25',  'sv_window_seven_24')) AS bad(id, prev)
WHERE s.published_version_id = bad.id;

UPDATE story_sessions ss SET story_version_id = bad.prev
FROM (VALUES
  ('sv_ace_6',            'sv_ace_5'),
  ('sv_ninth_archive_31', 'sv_ninth_archive_30'),
  ('sv_red_moon_29',      'sv_red_moon_28'),
  ('sv_seven_days_29',    'sv_seven_days_28'),
  ('sv_unbound_30',       'sv_unbound_29'),
  ('sv_window_seven_25',  'sv_window_seven_24')) AS bad(id, prev)
WHERE ss.story_version_id = bad.id;

DELETE FROM story_versions
WHERE story_version_id IN ('sv_ace_6','sv_ninth_archive_31','sv_red_moon_29',
                           'sv_seven_days_29','sv_unbound_30','sv_window_seven_25');

-- Expect one row of zeros.
SELECT
  (SELECT count(*) FROM story_versions v WHERE EXISTS
     (SELECT 1 FROM jsonb_array_elements(v.definition->'characters') c WHERE c ? 'calledName')) AS versions_with_calledname_left,
  (SELECT count(*) FROM stories st WHERE NOT EXISTS
     (SELECT 1 FROM story_versions v WHERE v.story_version_id=st.published_version_id)) AS dangling_published_pointers;
