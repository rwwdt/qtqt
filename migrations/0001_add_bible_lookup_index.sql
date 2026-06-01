-- Speeds up point/range lookup in /api/bible (book_id, chapter, verse BETWEEN)
CREATE INDEX IF NOT EXISTS idx_bible_lookup ON bible_verses(book_id, chapter, verse);
