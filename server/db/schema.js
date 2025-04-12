const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'database.db');

// Αν υπάρχει ήδη, το διαγράφουμε για καθαρό ξεκίνημα (προαιρετικό)
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

const db = new sqlite3.Database(dbPath);

// Δημιουργία πίνακα χρηστών
const createUsersTable = `
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  );
`;

// Δημιουργία πίνακα προπονήσεων (συσχετιζόμενο με users)
const createWorkoutsTable = `
  CREATE TABLE workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT NOT NULL,
    type TEXT NOT NULL,
    duration INTEGER NOT NULL,
    date TEXT NOT NULL
  );
`;

db.serialize(() => {
  db.run(createUsersTable, (err) => {
    if (err) return console.error('❌ users table error:', err.message);
    console.log('✅ Πίνακας users δημιουργήθηκε.');
  });

  db.run(createWorkoutsTable, (err) => {
    if (err) return console.error('❌ workouts table error:', err.message);
    console.log('✅ Πίνακας workouts δημιουργήθηκε.');
  });
});

db.close();