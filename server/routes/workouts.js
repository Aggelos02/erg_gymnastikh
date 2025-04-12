const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Σύνδεση με βάση δεδομένων
const dbPath = path.resolve(__dirname, '../db/database.db');
const db = new sqlite3.Database(dbPath);

// GET: Λήψη όλων των workouts
router.get('/', (req, res) => {
  db.all('SELECT * FROM workouts', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Σφάλμα στη βάση δεδομένων' });
    }
    res.json(rows);
  });
});

// POST: Προσθήκη νέου workout
router.post('/', (req, res) => {
  const { user, type, duration, date } = req.body;

  if (!user || !type || !duration || !date) {
    return res.status(400).json({ error: 'Όλα τα πεδία είναι υποχρεωτικά.' });
  }

  const query = 'INSERT INTO workouts (user, type, duration, date) VALUES (?, ?, ?, ?)';
  db.run(query, [user, type, duration, date], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Αποτυχία αποθήκευσης.' });
    }
    res.json({ id: this.lastID, message: 'Καταχωρήθηκε επιτυχώς' });
  });
});

module.exports = router;
