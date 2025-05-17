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

db.run(`
  CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS reset_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

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

db.run(`
  CREATE TABLE IF NOT EXISTS workout_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    category TEXT,
    duration INTEGER,
    date TEXT,
    xp_gain INTEGER DEFAULT 0,
    completed_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS weekly_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    week_start TEXT,
    week_end TEXT,
    total_workouts INTEGER,
    total_xp INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    target INTEGER NOT NULL,
    current INTEGER DEFAULT 0,
    is_completed INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

const guestEmail = 'demo@guest.com';
const guestPassword = 'guest123';

db.get(`SELECT * FROM users WHERE email = ?`, [guestEmail], async (err, user) => {
  if (err) return console.error('Error checking demo user:', err.message);
  if (!user) {
    const hashedPassword = await bcrypt.hash(guestPassword, 10);
    db.run(
      `INSERT INTO users (username, email, password, xp, level) VALUES (?, ?, ?, ?, ?)`,
      ['Demo User', guestEmail, hashedPassword, 0, 0],
      (err) => {
        if (err) {
          console.error('Failed to insert demo user:', err.message);
        } else {
          console.log('✅ Demo user created successfully.');
        }
      }
    );
  } else {
    console.log('ℹ️ Demo user already exists.');
  }
});

app.post('/api/earn-xp-and-delete', (req, res) => {
  const { userId, workoutId, xpGain } = req.body;
  if (!userId || !workoutId || !xpGain) return res.status(400).json({ error: 'Missing required fields.' });

  db.serialize(() => {
    db.get(`SELECT xp, level FROM users WHERE id = ?`, [userId], (err, user) => {
      if (err || !user) return res.status(500).json({ error: 'User not found.' });

      let newXP = user.xp + xpGain;
      let newLevel = user.level;
      if (newXP >= 300) {
        newXP -= 300;
        newLevel += 1;
      }

      db.run(`UPDATE users SET xp = ?, level = ? WHERE id = ?`, [newXP, newLevel, userId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        
        db.all(`SELECT * FROM goals WHERE user_id = ? AND is_completed = 0`, [userId], (err, goals) => {
          if (!err && goals.length > 0) {
            goals.forEach((goal) => {
              let newValue = goal.current;
              if (goal.type === 'xp') newValue += xpGain;
              else if (goal.type === 'workouts') newValue += 1;

              const isDone = newValue >= goal.target ? 1 : 0;
              db.run(
                `UPDATE goals SET current = ?, is_completed = ? WHERE id = ?`,
                [newValue, isDone, goal.id]
        );
      });
    }
  });

        db.get(`SELECT * FROM workouts WHERE id = ?`, [workoutId], (err, workout) => {
          if (err || !workout) return res.status(500).json({ error: 'Workout not found.' });

          db.run(
            `INSERT INTO workout_history (user_id, title, category, duration, date, xp_gain)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [workout.user_id, workout.title, workout.category, workout.duration, workout.date, xpGain],
            (err) => {
              if (err) return res.status(500).json({ error: 'Failed to save workout history.' });

              db.run(`DELETE FROM workouts WHERE id = ?`, [workoutId], function (err) {
                if (err) return res.status(500).json({ error: err.message });
                return res.json({ message: 'XP updated and workout completed.', xp: newXP, level: newLevel });
              });
            }
          );
        });
      });
    });
  });
});

app.post('/api/goals', (req, res) => {
  const { userId, type, target } = req.body;
  if (!userId || !type || !target) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  db.run(
    `INSERT INTO goals (user_id, type, target) VALUES (?, ?, ?)`,
    [userId, type, target],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Goal created', goalId: this.lastID });
    }
  );
});

app.get('/api/goals/:userId', (req, res) => {
  const { userId } = req.params;

  db.all(
    `SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// ✅ Delete Goal
app.delete('/api/goals/:id', (req, res) => {
  const goalId = req.params.id;

  db.run(`DELETE FROM goals WHERE id = ?`, [goalId], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted successfully' });
  });
});


const resetWeeklyStatsIfMonday = () => {
  const today = new Date();
  const isMonday = today.getDay() === 1;

  if (!isMonday) return;

  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const weekStart = monday.toISOString().split('T')[0];
  const weekEnd = sunday.toISOString().split('T')[0];

  db.all(`SELECT DISTINCT user_id FROM workout_history`, [], (err, users) => {
    if (err) return console.error('Failed to fetch users for weekly reset:', err.message);

    users.forEach(({ user_id }) => {
      db.get(`
        SELECT COUNT(*) AS total_workouts, SUM(xp_gain) AS total_xp
        FROM workout_history
        WHERE user_id = ?
      `, [user_id], (err, stats) => {
        if (err) return console.error(`Error fetching stats for user ${user_id}:`, err.message);

        const { total_workouts = 0, total_xp = 0 } = stats;

        db.run(`
          INSERT INTO weekly_stats (user_id, week_start, week_end, total_workouts, total_xp)
          VALUES (?, ?, ?, ?, ?)
        `, [user_id, weekStart, weekEnd, total_workouts, total_xp], (err) => {
          if (err) return console.error('Error inserting into weekly_stats:', err.message);

          db.run(`DELETE FROM workout_history WHERE user_id = ?`, [user_id], (err) => {
            if (err) console.error('Failed to clear workout_history after reset:', err.message);
            else console.log(`✅ Weekly stats stored and reset for user ${user_id}`);
          });
        });
      });
    });
  });
};

resetWeeklyStatsIfMonday();

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (username, email, password, xp, level) VALUES (?, ?, ?, 0, 0)`;

    db.run(query, [username, email, hashedPassword], function (err) {
      if (err) return res.status(500).json({ error: 'User already exists or DB error.' });
      res.status(201).json({ message: 'User registered successfully.', userId: this.lastID });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
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

// ✅ Get completed workout history for user
app.get('/api/workout-history/:userId', (req, res) => {
  const { userId } = req.params;
  db.all(`SELECT * FROM workout_history WHERE user_id = ? ORDER BY date`, [userId], (err, rows) => {
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

// ✅ Get Weekly Stats History for a user
app.get('/api/weekly-stats/:userId', (req, res) => {
  const userId = req.params.userId;

  db.all(
    `SELECT week_start, week_end, total_workouts, total_xp 
     FROM weekly_stats 
     WHERE user_id = ? 
     ORDER BY week_start DESC`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});


// Start Server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
