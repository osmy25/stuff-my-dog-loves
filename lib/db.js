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
      id: 12,
      sort_order: 5000,
      name: "Watching me eat",
      image: "/images/stare.gif",
      thoughts: {
        normal: ["meatball?", "interesting...", "i do dishes"],
        rare: ["this concerns me", "we share?", "closer... closer..."],
        legendary: ["...give it", "...you feel generous"],
      },
    },
    {
      id: 23,
      sort_order: 2000,
      name: "Carrying 'girlfriend'",
      image: "/images/carrygirlfriend.gif",
      thoughts: {
        normal: ["we are going outside", "we have plans", "we are adventuring"],
        rare: ["girlfriend comes too", "girlfriend enjoys fresh air"],
        legendary: ["...together against the world"],
      },
    },
    {
      id: 16,
      sort_order: 6000,
      name: "A knock at the door",
      image: "/images/someoneatdoor.gif",
      thoughts: {
        normal: ["ITS FOR ME", "FRIEND FRIEND FRIEND", "HELLO HELLO HELLO"],
        rare: ["I GOT IT I GOT IT", "LET ME GET IT"],
        legendary: ["...THIS IS MY MOMENT", "...IT BEGINS"],
      },
    },
    {
      id: 11,
      sort_order: 1000,
      name: "Fridge noises",
      image: "/images/fridgenoises.gif",
      thoughts: {
        normal: ["fridge?!", "…WAIT", "FOOD"],
        rare: ["i know that sound", "COMING!!!", "jet-dog"],
        legendary: ["...i am already there", "...i am speed"],
      },
    },
    {
      id: 22,
      sort_order: 7000,
      name: "Being dog-burrito",
      image: "/images/dogburrito.gif",
      thoughts: {
        normal: ["i am burrito dog", "blanket is my friend", "i am cozy boy"],
        rare: ["yes that is me", "certified cozy boy"],
        legendary: ["...the world is soft now", "...always warm and bestest"],
      },
    },
    {
      id: 13,
      sort_order: 8000,
      name: "Turning in his bed",
      image: "/images/viggoturnbed.gif",
      thoughts: {
        normal: ["turn turn turn", "just little bit more", "almost"],
        rare: ["maximum comfort soon", "bed is tricky", "adjusting..."],
        legendary: ["...just perfect", "...i found it", "...finally", "...yes"],
      },
    },
    {
      id: 1,
      sort_order: 9000,
      name: "Napping",
      image: "/images/viggonap.gif",
      thoughts: {
        normal: ["very cozy", "do not disturb", "5 more minutes"],
        rare: ["nap champion", "deep ZzzZZ"],
        legendary: ["...i am not here", "...only sleep exists"],
      },
    },
    {
      id: 24,
      sort_order: 10000,
      name: "Conquering big rock",
      image: "/images/bigrock.gif",
      thoughts: {
        normal: ["i am best climber", "king of big rock", "this is my mountain"],
        rare: ["very tall now", "mountain dog"],
        legendary: ["...all below is mine"],
      },
    },
    {
      id: 17,
      sort_order: 11000,
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
      sort_order: 12000,
      name: "Being silly",
      image: "/images/viggoonback.gif",
      thoughts: {
        normal: ["hihi", "advanced silly", "wheeeeee", "im the best", "im so cute"],
        rare: ["maximum wiggle", "look at me, look at me!"],
        legendary: ["...the silly form", "...too much cute", "...cuteness over 9000"],
      },
    },
    {
      id: 14,
      sort_order: 28000,
      name: "Zoomies",
      image: "/images/viggozoom.gif",
      thoughts: {
        normal: ["must go fast", "too much energy", "GO GO GO", "run first think never"],
        rare: ["i am energy", "maximum dog", "derp derp derp!", "i bounce!"],
        legendary: ["...i became speed", "...no laws only zoom", "...I am everywhere"],
      },
    },
    {
      id: 20,
      sort_order: 14000,
      name: "Bathroom privacy",
      image: "/images/bathroomprivacy.gif",
      thoughts: {
        normal: ["hello", "open", "why closed"],
        rare: ["you in there", "you forgot me", "i come in"],
        legendary: ["...no secrets"],
      },
    },
    {
      id: 21,
      sort_order: 15000,
      name: "Being a good boy",
      image: "/images/goodboy.gif",
      thoughts: {
        normal: ["me?", "i did good", "i am bestest boy", "correct"],
        rare: ["yes that is me", "i knew it", "certified good boy"],
        legendary: ["...always bestest"],
      },
    },
    {
      id: 19,
      sort_order: 16000,
      name: "Sausage...",
      image: "/images/sooosage.gif",
      thoughts: {
        normal: ["that is sausage", "yes i see it", "just looking"],
        rare: ["mmmm soosage", "i stay here now", "good place for me"],
        legendary: ["...soosage"],
      },
    },
    {
      id: 3,
      sort_order: 17000,
      name: "A great stick",
      image: "/images/chewstick.gif",
      thoughts: {
        normal: ["mmm stick", "so chewy", "stick best", "love stick"],
        rare: ["THE stick", "only stick matters", "elite stick"],
        legendary: ["...stick chose me"],
      },
    },
    {
      id: 8,
      sort_order: 18000,
      name: "Yummy biscuit",
      image: "/images/dogtreat.gif",
      thoughts: {
        normal: ["much yum", "*cronch*", "gone fast", "where go?", "one more pls"],
        rare: ["instant vanish", "snack miracle", "more for research"],
        legendary: ["...biscuit was illusion"],
      },
    },
    {
      id: 18,
      sort_order: 19000,
      name: "The word 'walk'",
      image: "/images/thewordwalk.gif",
      thoughts: {
        normal: ["did i hear it?", "i heard it", "legs ready"],
        rare: ["we GOING", "its time", "you said it right?"],
        legendary: ["... WHY ARENT WE GOING YET"],
      },
    },
    {
      id: 15,
      sort_order: 27000,
      name: "Side-eyeing me",
      image: "/images/sidestare.gif",
      thoughts: {
        normal: ["not looking", "didnt look", "just sitting here"],
        rare: ["oops...", "what? no i didnt..."],
        legendary: ["...i see nothing", "...nope didnt look", "...you saw nothing"],
      },
    },
    {
      id: 5,
      sort_order: 20000,
      name: "Duck friend Thomas",
      image: "/images/thomasgif.gif",
      thoughts: {
        normal: ["strange dog", "is he dog?", "not dog", "what if dog?", "he funny", "important"],
        rare: ["wise duck", "he knows things", "mystery bird"],
        legendary: ["...knows all"],
      },
    },
    {
      id: 25,
      sort_order: 21000,
      name: "Juicy gossip",
      image: "/images/gossip.gif",
      thoughts: {
        normal: ["you said what now?", "thomas loves drama", "this is huge"],
        rare: ["what the quack?"],
        legendary: ["...what the quacking QUACK"],
      },
    },
    {
      id: 2,
      sort_order: 22000,
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
      sort_order: 23000,
      name: "Cat brother Otis",
      image: "/images/otistailwag.gif",
      thoughts: {
        normal: ["loudmouth", "little scary", "very tiny"],
        rare: ["kinda cute", "mini dog?", "love him", "chaos in cat form"],
        legendary: ["...tiny but mighty"],
      },
    },
    {
      id: 7,
      sort_order: 24000,
      name: "Barking",
      image: "/images/viggobark.gif",
      thoughts: {
        normal: ["solve problem", "very urgent", "much decibel", "alert alert", "important bark", "big announcement"],
        rare: ["saved everyone", "heroic volume", "will do again"],
        legendary: ["...voice of destiny"],
      },
    },
    {
      id: 9,
      sort_order: 25000,
      name: "The green ball",
      image: "/images/greenball.gif",
      thoughts: {
        normal: ["best ever", "good squeeze", "big bounce", "always catch", "is mine"],
        rare: ["perfect orb", "green greatness", "never give back"],
        legendary: ["...this is forever", "...ball is eternal", "...i cannot let go"],
      },
    },
    {
      id: 6,
      sort_order: 26000,
      name: "Meatballs",
      image: "/images/meatball.gif",
      thoughts: {
        normal: ["top currency", "drool lvl 9000", "smells like yes", "must have", "more pls"],
        rare: ["meatball heaven", "peak existence", "worth everything"],
        legendary: ["...this is truth", "...nothing else matters", "...this is divine", "...sacred roundness"],
      },
    },
    {
      id: 26,
      sort_order: 18500,
      name: "His stick collection",
      image: "/images/stickcollection.gif",
      thoughts: {
        normal: ["important sticks", "collected with care", "i found all these"],
        rare: ["museum worthy"],
        legendary: ["...my greatest findings"],
      },
    },
    {
      id: 27,
      sort_order: 4000,
      name: "Ball rescue missions",
      image: "/images/swimming.gif",
      thoughts: {
        normal: ["no ball left behind", "must save green ball", "paddle paddle paddle"],
        rare: ["tiny boat mode"],
        legendary: ["...across the great blue"],
      },
    },
    {
      id: 28,
      sort_order: 13000,
      name: "Picking blueberries",
      image: "/images/blueberries.gif",
      thoughts: {
        normal: ["i help", "much yum", "bluberry grow in basket"],
        rare: ["bluberry so good"],
        legendary: ["...mmmm bluberry yum yum"],
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