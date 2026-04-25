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
      hearts INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 999
    );
  `);

  try {
    db.exec(`ALTER TABLE my_dog_likes ADD COLUMN hearts INTEGER NOT NULL DEFAULT 0;`);
  } catch (e) {
    // column already exists
  }

  try {
    db.exec(`ALTER TABLE my_dog_likes ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 999;`);
  } catch (e) {
    // column already exists
  }

  const items = [
    {
      id: 11,
      sort_order: 1,
      name: "Fridge noises",
      image: "/images/fridgenoises.gif",
      thoughts: {
        normal: ["fridge?", "...!!!", "FOOD"],
        rare: ["i know that one", "COMING!!!", "jet-dog"],
        legendary: ["...i am already there", "...i am speed"],
      },
    },
    {
      id: 16,
      sort_order: 2,
      name: "A knock at the door",
      image: "/images/someoneatdoor.gif",
      thoughts: {
        normal: ["HI HI HI HI", "FRIEND FRIEND FRIEND", "HELLO HELLO HELLO"],
        rare: ["I GOT IT I GOT IT", "LET ME GET IT", "ITS FOR ME"],
        legendary: ["...THIS IS MY MOMENT", "...IT BEGINS"],
      },
    },
    {
      id: 12,
      sort_order: 3,
      name: "Watching me eat",
      image: "/images/stare.gif",
      thoughts: {
        normal: ["just watching", "interesting...", "i wait..."],
        rare: ["this concerns me", "we share?", "closer... closer..."],
        legendary: ["...give it", "...you feel generous"],
      },
    },
    {
      id: 14,
      sort_order: 4,
      name: "Zoomies",
      image: "/images/viggozoom.gif",
      thoughts: {
        normal: ["must go fast", "too much energy", "GO GO GO", "run first think never"],
        rare: ["i am energy", "maximum dog", "derp derp derp!", "i bounce!"],
        legendary: ["...i became speed", "...no laws only zoom", "...I am everywhere"],
      },
    },
    {
      id: 9,
      sort_order: 5,
      name: "The green ball",
      image: "/images/greenball.gif",
      thoughts: {
        normal: ["best ever", "good squeeze", "big bounce", "always catch", "is mine"],
        rare: ["perfect orb", "green greatness", "never give back"],
        legendary: ["...this is forever", "...ball is eternal", "...i cannot let go"],
      },
    },
    {
      id: 17,
      sort_order: 6,
      name: "Barking at his ball",
      image: "/images/barkingatball.gif",
      thoughts: {
        normal: ["why not move", "do something", "ok now move"],
        rare: ["maybe bark works", "i fix with bark", "i said move"],
        legendary: ["... i command you", "...activate", "...this unacceptable"],
      },
    },
    {
      id: 10,
      sort_order: 7,
      name: "Being silly",
      image: "/images/viggoonback.gif",
      thoughts: {
        normal: ["hihi", "advanced silly", "also back scratch", "im the best", "im so cute"],
        rare: ["maximum wiggle", "look at me, look at me!", "wheeeeee"],
        legendary: ["...the silly form", "...too much cute", "...cuteness over 9000"],
      },
    },
    {
      id: 13,
      sort_order: 8,
      name: "Turning in his bed",
      image: "/images/viggoturnbed.gif",
      thoughts: {
        normal: ["turn turn turn", "just little bit more", "almost"],
        rare: ["maximum comfort soon", "bed is tricky", "adjusting..."],
        legendary: ["...just perfect", "...i found it", "...finally", "...yes"],
      },
    },
    {
      id: 6,
      sort_order: 9,
      name: "Meatballs",
      image: "/images/meatball.gif",
      thoughts: {
        normal: ["top currency", "drool lvl 9000", "smells like yes", "must have", "more pls"],
        rare: ["meatball heaven", "peak existence", "worth everything"],
        legendary: ["...this is truth", "...nothing else matters", "...this is divine", "...sacred roundness"],
      },
    },
    {
      id: 1,
      sort_order: 10,
      name: "Napping",
      image: "/images/viggonap.gif",
      thoughts: {
        normal: ["best thing", "very cozy", "do not disturb", "5 more minutes"],
        rare: ["nap champion", "deep ZzzZZ"],
        legendary: ["...i am not here", "...only sleep exists"],
      },
    },
    {
      id: 3,
      sort_order: 11,
      name: "A great stick",
      image: "/images/chewstick.gif",
      thoughts: {
        normal: ["mmm stick", "so chewy", "stick best", "love stick"],
        rare: ["THE stick", "only stick matters", "elite stick"],
        legendary: ["...this is purpose", "...stick chose me"],
      },
    },
    {
      id: 8,
      sort_order: 12,
      name: "Yummy biscuit",
      image: "/images/dogtreat.gif",
      thoughts: {
        normal: ["much yum", "*cronch*", "gone fast", "where go?", "one more pls"],
        rare: ["instant vanish", "snack miracle", "more for research"],
        legendary: ["...hunger remains", "...biscuit was illusion"],
      },
    },
    {
      id: 18,
      sort_order: 13,
      name: "The word walk",
      image: "/images/thewordwalk.gif",
      thoughts: {
        normal: ["did i hear it?", "i heard it", "legs ready"],
        rare: ["we GOING", "its time", "you said it right?"],
        legendary: ["... WHY ARENT WE GOING YET", "...we leave immediately", "...this unacceptable"],
      },
    },
    {
      id: 15,
      sort_order: 14,
      name: "Side-eyeing me",
      image: "/images/sidestare.gif",
      thoughts: {
        normal: ["not looking", "didnt look", "just sitting here"],
        rare: ["oops...", "what? no i didnt..."],
        legendary: ["...i see nothing", "...nope didnt look", "...you saw nothing"],
      },
    },
    {
      id: 2,
      sort_order: 15,
      name: "Cat sister Signe",
      image: "/images/signetailwag.gif",
      thoughts: {
        normal: ["give kisses", "runs fast", "very cuddly", "so soft"],
        rare: ["love her lots", "smells nice", "protect always"],
        legendary: ["...super-sister", "...she is the best"],
      },
    },
    {
      id: 4,
      sort_order: 16,
      name: "Cat brother Otis",
      image: "/images/otistailwag.gif",
      thoughts: {
        normal: ["loudmouth", "little scary", "very tiny"],
        rare: ["kinda cute", "mini dog?", "love him", "chaos in cat form"],
        legendary: ["...cant have biscuit", "...tiny but mighty"],
      },
    },
    {
      id: 5,
      sort_order: 17,
      name: "Duck friend Thomas",
      image: "/images/thomasgif.gif",
      thoughts: {
        normal: ["strange dog", "is he dog?", "not dog", "what if dog?", "he funny", "important"],
        rare: ["wise duck", "he knows things", "mystery bird"],
        legendary: ["...seen beyond", "...not just duck", "...knows all"],
      },
    },
    {
      id: 19,
      sort_order: 18,
      name: "Sausage...",
      image: "/images/sooosage.gif",
      thoughts: {
        normal: ["that is sausage", "yes i see it", "just looking"],
        rare: ["mmmm soosage", "i stay here now", "good place for me"],
        legendary: ["...soosage", "...i help guard this", "...my soosage"],
      },
    },
    {
      id: 7,
      sort_order: 19,
      name: "Barking",
      image: "/images/viggobark.gif",
      thoughts: {
        normal: ["solve problem", "very urgent", "much decibel", "alert alert", "important bark", "big announcement"],
        rare: ["saved everyone", "heroic volume", "will do again"],
        legendary: ["...voice of destiny", "...i must speak"],
      },
    },
  ];

  const upsert = db.prepare(`
    INSERT INTO my_dog_likes (id, name, image, thoughts, sort_order)
    VALUES (@id, @name, @image, @thoughts, @sort_order)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      image = excluded.image,
      thoughts = excluded.thoughts,
      sort_order = excluded.sort_order
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