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
      thoughts: {
        normal: ["best thing", "very cozy", "do not disturb", "5 more minutes"],
        rare: ["nap champion", "deep ZzzZZ"],
        legendary: ["...i am not here", "...only sleep exists"],
      },
    },
    {
      id: 2,
      name: "Cat sister Signe",
      image: "/images/signetailwag.gif",
      thoughts: {
        normal: ["give kisses", "runs fast", "very cuddly", "so soft"],
        rare: ["love her lots", "smells nice", "protect always"],
        legendary: ["...we are safe", "...she is home"],
      },
    },
    {
      id: 3,
      name: "A great stick",
      image: "/images/chewstick.gif",
      thoughts: {
        normal: ["mmm stick", "so chewy", "stick best", "love stick"],
        rare: ["THE stick", "only stick matters", "elite stick"],
        legendary: ["...this is purpose", "...stick chose me"],
      },
    },
    {
      id: 4,
      name: "Cat brother Otis",
      image: "/images/otistailwag.gif",
      thoughts: {
        normal: ["loudmouth", "little scary", "very tiny"],
        rare: ["kinda cute", "mini dog?", "love him", "chaos in cat form",],
        legendary: ["...cant have biscuit", "...tiny but mighty"],
      },
    },
    {
      id: 5,
      name: "Duck friend Thomas",
      image: "/images/thomasgif.gif",
      thoughts: {
        normal: ["strange dog", "is he dog?", "not dog", "what if dog?", "he funny", "important"],
        rare: ["wise duck", "he knows things", "mystery bird"],
        legendary: ["...seen beyond", "...not just duck", "...knows all"],
      },
    },
    {
      id: 6,
      name: "Meatballs",
      image: "/images/meatball.gif",
      thoughts: {
        normal: ["top currency", "drool lvl 9000", "smells like yes", "must have", "more pls"],
        rare: ["meatball heaven", "peak existence", "worth everything"],
        legendary: ["...this is truth", "...nothing else matters", "...this is divine", "...sacred roundness"],
      },
    },
    {
      id: 7,
      name: "Barking",
      image: "/images/viggobark.gif",
      thoughts: {
        normal: ["solve problem", "very urgent", "much decibel", "alert alert", "important bark", "big announcement"],
        rare: ["saved everyone", "heroic volume", "will do again"],
        legendary: ["...voice of destiny", "...i must speak"],
      },
    },
    {
      id: 8,
      name: "Yummy biscuit",
      image: "/images/dogtreat.gif",
      thoughts: {
        normal: ["much yum", "*cronch*", "gone fast", "where go?", "one more pls"],
        rare: ["instant vanish", "snack miracle", "more for research"],
        legendary: ["...hunger remains", "...biscuit was illusion"],
      },
    },
    {
      id: 9,
      name: "The green ball",
      image: "/images/greenball.gif",
      thoughts: {
        normal: ["best ever", "good squeeze", "big bounce", "always catch", "is mine"],
        rare: ["perfect orb", "green greatness", "never give back"],
        legendary: ["...this is forever", "...ball is eternal", "...i cannot let go"],
      },
    },
    {
      id: 10,
      name: "Being silly on my back",
      image: "/images/viggoonback.gif",
      thoughts: {
        normal: ["hihi", "advanced silly", "also back scratch", "im the best", "im so cute"],
        rare: ["maximum wiggle", "look at me, look at me!", "wheeeeee"],
        legendary: ["...the silly form", "...too much cute", "...cuteness over 9000"],
      },
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
      upsert.run({
        ...item,
        thoughts: JSON.stringify(item.thoughts),
      });
    }
  });

  insertMany(items);

  global.db = db;
}

export default global.db;