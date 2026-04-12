import Database from "better-sqlite3";

let db;

if (!global.db) {
  db = new Database("dogstuff.db");

  db.exec(`
    CREATE TABLE IF NOT EXISTS my_dog_likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      image TEXT NOT NULL,
      thoughts TEXT,
      hearts INTEGER NOT NULL DEFAULT 0
    );
  `);

  // Add hearts column if DB already exists
  try {
    db.exec(`ALTER TABLE my_dog_likes ADD COLUMN hearts INTEGER DEFAULT 0;`);
  } catch (e) {
    // already exists → ignore
  }

  db.exec(`
    INSERT INTO my_dog_likes (name, image, thoughts, hearts) VALUES
      ('Napping', '/images/viggonap.gif', '["best thing", "after playing", "do not disturb pls"]', 0),
      ('Cat sister Signe', '/images/signetailwag.gif', '["give kisses", "runs fast", "very cuddly"]', 0),
      ('A great stick', '/images/chewstick.gif', '["mMmm stick", "so chewy", "stick is best"]', 0),
      ('Cat brother Otis', '/images/otistailwag.gif', '["loudmouth", "little scary", "very tiny"]', 0),
      ('Duck friend Thomas', '/images/thomasgif.gif', '["strange creature", "is he dog?", "not dog", "what if dog?", "he funny", "important"]', 0),
      ('Meatballs', '/images/meatball.gif', '["top currency", "drool lvl 9000", "smells like yes", "must have", "more pls"]', 0),
      ('Barking', '/images/viggobark.gif', '["how I solve problem", "very urgent", "much decibel", "alert, alert", "sometimes i do for no reason"]', 0)

    ON CONFLICT(name) DO UPDATE SET
      image=excluded.image,
      thoughts=excluded.thoughts;
  `);

  global.db = db;
}

export default global.db;