const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Βάση Δεδομένων
const dbPath = path.resolve(__dirname, './db/database.db');
const db = new sqlite3.Database(dbPath);

// Workouts Route
const workoutsRouter = require('./routes/workouts');
app.use('/api/workouts', workoutsRouter);

// ✅ Auth Route (Login/Sign up)
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter); // ✅ εδώ πρέπει να είναι '/api/auth'

// Default route
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

// Διαγραφή προπόνησης
app.delete('/api/workouts/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM workouts WHERE id = ?';

  db.run(query, [id], function (err) {
    if (err) {
      console.error('Σφάλμα διαγραφής:', err);
      return res.status(500).json({ error: 'Σφάλμα διαγραφής από βάση' });
    }
    res.status(200).json({ success: true });
  });
});

// Ξεκινάει ο server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
