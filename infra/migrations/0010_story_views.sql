-- A view count for the story page.
--
-- `views` is the curated floor a world launches with, written by
-- `npm run seed:social`, the same way `likes` is. The real half is
-- `impressions`, which the detail route already bumps on every open; the
-- projection adds the two, so a real open always moves the number on screen.
-- Kept apart from `impressions` because the ranking divides hides by
-- impressions, and a seeded figure in there would bury every hide.
ALTER TABLE story_signals ADD COLUMN IF NOT EXISTS views integer NOT NULL DEFAULT 0;
