import Database from "better-sqlite3";

let db;

if (!global.db) {
  db = new Database("dogstuff.db");

  db.exec(`
    CREATE TABLE IF NOT EXISTS my_dog_likes (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT NOT NULL,
      thoughts TEXT,
      hearts INTEGER NOT NULL DEFAULT 0
    );
  `);

  // Add hearts column if DB already exists and is missing it
  try {
    db.exec(`ALTER TABLE my_dog_likes ADD COLUMN hearts INTEGER NOT NULL DEFAULT 0;`);
  } catch (e) {
    // column already exists
  }

  const items = [
    {
      id: 1,
      name: "Napping",
      image: "/images/viggonap.gif",
      thoughts: '["best thing", "after playing", "do not disturb pls"]',
    },
    {
      id: 2,
      name: "Cat sister Signe",
      image: "/images/signetailwag.gif",
      thoughts: '["give kisses", "runs fast", "very cuddly"]',
    },
    {
      id: 3,
      name: "A great stick",
      image: "/images/chewstick.gif",
      thoughts: '["mMmm stick", "so chewy", "stick is best", "i love stick"]',
    },
    {
      id: 4,
      name: "Cat brother Otis",
      image: "/images/otistailwag.gif",
      thoughts: '["loudmouth", "little scary", "very tiny"]',
    },
    {
      id: 5,
      name: "Duck friend Thomas",
      image: "/images/thomasgif.gif",
      thoughts: '["strange creature", "is he dog?", "not dog", "what if dog?", "he funny", "important"]',
    },
    {
      id: 6,
      name: "Meatballs",
      image: "/images/meatball.gif",
      thoughts: '["top currency", "drool lvl 9000", "smells like yes", "must have", "more pls"]',
    },
    {
      id: 7,
      name: "Barking",
      image: "/images/viggobark.gif",
      thoughts: '["how I solve problem", "very urgent", "much decibel", "alert, alert", "sometimes i do for no reason"]',
    },
    {
      id: 8,
      name: "Yummy biscuit",
      image: "/images/dogtreat.gif",
      thoughts: '["much yum", "*cronch*", "gone in millisecond", "where did it go?", "its okey i can take one more"]',
    },
  ];

  const upsert = db.prepare(`
    INSERT INTO my_dog_likes (id, name, image, thoughts)
    VALUES (@id, @name, @image, @thoughts)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      image = excluded.image,
      thoughts = excluded.thoughts
  `);

  const insertMany = db.transaction((items) => {
    for (const item of items) {
      upsert.run(item);
    }
  });

  insertMany(items);

  global.db = db;
}

export default global.db;