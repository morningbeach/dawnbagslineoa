CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  line_user_id TEXT NOT NULL,
  direction TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS ai_analysis (
  id TEXT PRIMARY KEY,
  chat_id TEXT NOT NULL,
  summary TEXT,
  intent TEXT,
  estimated_qty INTEGER,
  estimated_price_range TEXT,
  material_prediction TEXT,
  emotion TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS quotes (
  id TEXT PRIMARY KEY,
  chat_id TEXT,
  line_user_id TEXT,
  status TEXT DEFAULT 'draft',
  total_price INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS quote_items (
  id TEXT PRIMARY KEY,
  quote_id TEXT NOT NULL,
  title TEXT,
  spec TEXT,
  unit_price INTEGER,
  qty INTEGER,
  subtotal INTEGER
);
