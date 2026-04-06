import Database from "better-sqlite3";
import path from "path";


const db = new Database("dogstuff.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS my_dog_likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    image TEXT NOT NULL
  );
`);

db.exec(`
  INSERT OR IGNORE INTO my_dog_likes (name, image) VALUES
    ('Cat sister', '/images/signetailwag.gif'),
    ('Cat brother', '/images/otistailwag.gif'),
    ('Duck friend', '/images/thomasstatic.png'),
    ('Napping', '/images/napping.png'),
    ('Barking', '/images/barking.png');
`);

export default db;