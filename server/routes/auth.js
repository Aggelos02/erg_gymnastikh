const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const dbPath = path.resolve(__dirname, '../db/database.db');
const db = new sqlite3.Database(dbPath);

// 🚀 Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Κρυπτογράφηση κωδικού
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Σφάλμα κατά την κρυπτογράφηση' });

    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.run(query, [name, email, hash], function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Email υπάρχει ήδη ή σφάλμα βάσης' });
      }

      res.status(201).json({ message: 'Εγγραφή επιτυχής' });
    });
  });
});

// 🔐 Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Λανθασμένα στοιχεία' });
    }

    if (!user.password) {
      return res.status(500).json({ error: 'Ο χρήστης δεν έχει αποθηκευμένο κωδικό' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).json({ error: 'Σφάλμα σύγκρισης κωδικού' });

      if (result) {
        // Προστατεύουμε τα δεδομένα αφαιρώντας το password πριν το στείλουμε πίσω
        const { id, name, email } = user;
        res.status(200).json({
          message: 'Σύνδεση επιτυχής',
          user: { id, name, email }
        });
      } else {
        res.status(401).json({ error: 'Λανθασμένος κωδικός' });
      }
    });
  });
});

module.exports = router;
