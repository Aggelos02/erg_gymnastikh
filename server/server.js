const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const workoutsRouter = require('./routes/workouts');
app.use('/api/workouts', workoutsRouter);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
