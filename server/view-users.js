const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, './db/database.db');
const db = new sqlite3.Database(dbPath);

db.all('SELECT * FROM users', (err, rows) => {
  if (err) return console.error('❌', err.message);

  console.log('📋 Χρήστες στη βάση:');
  console.table(rows);

  db.close();
});
