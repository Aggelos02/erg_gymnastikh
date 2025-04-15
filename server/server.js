const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
const workoutsRouter = require('./routes/workouts');
app.use('/api/workouts', workoutsRouter);

// Default route (προαιρετικά για έλεγχο)
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
