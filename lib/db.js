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
    ('Napping', '/images/viggonap.gif', '["best thing", "after playing", "do not disturb pls"]'),
    ('Cat sister Signe', '/images/signetailwag.gif', '["give kisses", "runs fast", "too cuddly"]'),
    ('Cat brother Otis', '/images/otistailwag.gif', '["loudmouth", "little scary", "very tiny"]'),
    ('Duck friend Thomas', '/images/thomasgif.gif', '["strange creature", "he funny", "important"]'),
    ('Meatballs', '/images/meatball.gif', '["top currency", "drool lvl 9000", "smells like yes"]'),
    ('Barking', '/images/viggobark.gif', '["how I solve problem", "very urgent", "much decibel"]');
`);

  global.db = db;
}

export default global.db;