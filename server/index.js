// server/index.js

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dbPath = path.resolve(__dirname, 'gym.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create tables

// ✅ Users with XP and Level
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 0
  )
`);

// ✅ Exercises

db.run(`
  CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT
  )
`);

// ✅ Reset Tokens

db.run(`
  CREATE TABLE IF NOT EXISTS reset_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

// ✅ Workouts Table

db.run(`
  CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    category TEXT,
    duration INTEGER,
    notes TEXT,
    date TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

// Routes
// ✅ New Route: Earn XP and Delete Workout
app.post('/api/earn-xp-and-delete', (req, res) => {
  const { userId, workoutId, xpGain } = req.body;

  if (!userId || !workoutId || !xpGain) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  db.serialize(() => {
    db.get(`SELECT xp, level FROM users WHERE id = ?`, [userId], (err, user) => {
      if (err || !user) return res.status(500).json({ error: 'User not found.' });

      let newXP = user.xp + xpGain;
      let newLevel = user.level;

      if (newXP >= 300) {
        newXP = newXP - 300;
        newLevel += 1;
      }

      db.run(`UPDATE users SET xp = ?, level = ? WHERE id = ?`, [newXP, newLevel, userId], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        db.run(`DELETE FROM workouts WHERE id = ?`, [workoutId], function (err) {
          if (err) return res.status(500).json({ error: err.message });

          return res.json({ message: 'XP updated and workout deleted.', xp: newXP, level: newLevel });
        });
      });
    });
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to AI Gym Master API');
});

app.get('/api/exercises', (req, res) => {
  db.all('SELECT * FROM exercises', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/exercises', (req, res) => {
  const { name, category, description } = req.body;
  if (!name || !category) {
    return res.status(400).json({ error: 'Name and category are required.' });
  }

  const query = `INSERT INTO exercises (name, category, description) VALUES (?, ?, ?)`;
  db.run(query, [name, category, description || ''], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({ id: this.lastID, name, category, description });
  });
});

app.delete('/api/workouts/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM workouts WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `Workout ${id} deleted.` });
  });
});

// ✅ Delete user

app.delete('/api/delete-user/:id', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `User ${id} deleted.` });
  });
});

// ✅ Register

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (username, email, password, xp, level) VALUES (?, ?, ?, 0, 0)`;

  db.run(query, [username, email, hashedPassword], function (err) {
    if (err) return res.status(500).json({ error: 'User already exists or DB error.' });
    res.status(201).json({ message: 'User registered successfully.', userId: this.lastID });
  });
});

// ✅ Login with XP and Level

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials.' });

    res.json({
      message: 'Login successful',
      userId: user.id,
      username: user.username,
      xp: user.xp || 0,
      level: user.level ?? 0
    });
  });
});

// ✅ Forgot / Reset password

app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const resetLink = `http://localhost:5173/reset-password?token=${user.id}`;
    res.json({ message: 'Reset link generated', resetLink });
  });
});

app.post('/api/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email and new password are required.' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const query = `UPDATE users SET password = ? WHERE email = ?`;
  db.run(query, [hashedPassword, email], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'User with this email not found.' });

    res.json({ message: 'Password has been reset successfully.' });
  });
});

// ✅ Add workout

app.post('/api/workouts', (req, res) => {
  const { userId, title, category, duration, notes, date } = req.body;
  if (!userId || !title) return res.status(400).json({ error: 'Missing required fields.' });

  db.run(
    `INSERT INTO workouts (user_id, title, category, duration, notes, date) VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, title, category || '', duration || 0, notes || '', date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Workout added', workoutId: this.lastID });
    }
  );
});

// ✅ Get workouts for a user

app.get('/api/workouts/:userId', (req, res) => {
  const userId = req.params.userId;

  db.all(`SELECT * FROM workouts WHERE user_id = ? ORDER BY date DESC`, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ✅ Delete workout

app.delete('/api/delete-workout/:id', (req, res) => {
  const workoutId = req.params.id;

  db.run('DELETE FROM workouts WHERE id = ?', [workoutId], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json({ message: 'Workout deleted successfully' });
  });
});

// ✅ Update XP and Level

app.post('/api/update-xp', (req, res) => {
  const { userId, xpGain } = req.body;
  if (!userId || !xpGain) return res.status(400).json({ error: 'Missing user ID or XP gain.' });

  db.get(`SELECT xp, level FROM users WHERE id = ?`, [userId], (err, user) => {
    if (err || !user) return res.status(500).json({ error: 'User not found.' });

    let newXP = user.xp + xpGain;
    let newLevel = user.level;

    if (newXP >= 300) {
      newXP = newXP - 300;
      newLevel += 1;
    }

    db.run(`UPDATE users SET xp = ?, level = ? WHERE id = ?`, [newXP, newLevel, userId], function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: 'XP updated', xp: newXP, level: newLevel });
    });
  });
});

// ✅ Get users

app.get('/api/users', (req, res) => {
  db.all('SELECT id, username, email, xp, level FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ✅ Leaderboard - Top 3 χρήστες με τα περισσότερα level
app.get('/api/leaderboard', (req, res) => {
  const sql = `
    SELECT username, xp, level
    FROM users
    ORDER BY level DESC, xp DESC
    LIMIT 3
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching leaderboard:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(rows);
  });
});


// Start Server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
