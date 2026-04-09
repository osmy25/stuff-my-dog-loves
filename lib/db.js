import Database from "better-sqlite3";

let db;

if (!global.db) {
  db = new Database("dogstuff.db");

  db.exec(`
    CREATE TABLE IF NOT EXISTS my_dog_likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      image TEXT NOT NULL,
      thoughts TEXT
    );
  `);

db.exec(`
  INSERT OR REPLACE INTO my_dog_likes (name, image, thoughts) VALUES
    ('Napping', '/images/viggonap.gif', '["warm", "safe", "do not disturb"]'),
    ('Cat sister', '/images/signetailwag.gif', '["not food", "sometimes friend", "confusing"]'),
    ('Cat brother', '/images/otistailwag.gif', '["runs fast", "chase?", "not allowed"]'),
    ('Duck friend', '/images/thomasgif.gif', '["strange", "loud", "important"]'),
    ('Meatballs', '/images/meatball.gif', '["warm… important", "fell once = mine", "smells like yes"]'),
    ('Barking', '/images/viggobark.gif', '["must alert", "very urgent", "handled it"]');
`);

  global.db = db;
}

export default global.db;