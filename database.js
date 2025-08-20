const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./musicstore.db');

// Creează tabelele dacă nu există
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS songs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      song_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY(song_id) REFERENCES songs(id)
    )
  `);
});

module.exports = db;