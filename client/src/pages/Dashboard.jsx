// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Leaderboard from '../components/Leaderboard';
import GoalTracker from '../components/GoalTracker';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    title: '',
    category: '',
    duration: '',
    date: '',
    notes: ''
  });
  const [message, setMessage] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const xpToNextLevel = 300;

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedXP = localStorage.getItem('xp');
    const storedLevel = localStorage.getItem('level');

    if (!storedUsername) {
      navigate('/login');
    } else {
      setUser({
        username: storedUsername,
        xp: parseInt(storedXP || '0', 10),
        level: parseInt(storedLevel || '0', 10),
      });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/leaderboard');
        setLeaderboard(res.data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      }
    };
    fetchLeaderboard();
  }, []);

  const fetchWorkouts = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const response = await axios.get(`http://localhost:3001/api/workouts/${userId}`);
      setWorkouts(response.data);
    } catch (error) {
      console.error('Failed to fetch workouts:', error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const getXPGain = (level) => {
    const gain = 50 - (level - 1) * 5;
    return gain < 10 ? 10 : gain;
  };

  const handleEarnXPAndDelete = async (userId, workoutId) => {
    const xpGain = getXPGain(user.level);
    try {
      const res = await axios.post('http://localhost:3001/api/earn-xp-and-delete', {
        userId,
        workoutId,
        xpGain
      });

      localStorage.setItem('xp', res.data.xp);
      localStorage.setItem('level', res.data.level);

      setUser((prev) => ({
        ...prev,
        xp: res.data.xp,
        level: res.data.level,
      }));

      fetchWorkouts();
    } catch (error) {
      console.error('Failed to earn XP and delete workout:', error);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      await axios.post('http://localhost:3001/api/workouts', {
        userId: Number(userId),
        ...form,
        date: new Date(form.date).toISOString().split('T')[0]
      });

      setForm({ title: '', category: '', duration: '', date: '', notes: '' });
      setMessage('Workout saved successfully!');
      setTimeout(() => setMessage(''), 3000);
      fetchWorkouts();
    } catch (err) {
      console.error('Failed to add workout:', err);
    }
  };

  const handleDeleteWorkout = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this workout?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:3001/api/delete-workout/${id}`);
      fetchWorkouts();
    } catch (err) {
      console.error('Failed to delete workout:', err);
    }
  };

  if (!user) return null;

  const progress = (user.xp % xpToNextLevel) / xpToNextLevel * 100;
  const totalXP = user.level * xpToNextLevel + user.xp;
  const maxXP = 3000;
  const strengthGainPercent = Math.min(100, Math.floor((totalXP / maxXP) * 100));
  let strengthLabel = 'Beginner';
  if (totalXP >= 1000) strengthLabel = 'Intermediate';
  if (totalXP >= 2000) strengthLabel = 'Advanced';
  if (totalXP >= 2800) strengthLabel = 'Elite';

  const earnedWorkouts = Math.floor(totalXP / 50); // ✅ μόνο όταν γίνεται Earn XP

  let goalProgressDisplay = 'Top Rank!';
  const currentIndex = leaderboard.findIndex(u => u.username === user.username);
  if (leaderboard.length > 1 && currentIndex > 0) {
    const aboveUser = leaderboard[currentIndex - 1];
    const currentXP = user.level * xpToNextLevel + user.xp;
    const aboveXP = aboveUser.level * xpToNextLevel + aboveUser.xp;

    if (currentXP === aboveXP) {
      goalProgressDisplay = '⚖️ Tied';
    } else if (currentXP < aboveXP) {
      const diff = aboveXP - currentXP;
      goalProgressDisplay = `${Math.max(0, 100 - (diff / xpToNextLevel) * 100).toFixed(1)}%`;
    }
  }

  const getDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const workoutsByDay = {};
  days.forEach(day => (workoutsByDay[day] = []));
  workouts.forEach(w => {
    const day = getDayOfWeek(w.date);
    if (workoutsByDay[day]) {
      workoutsByDay[day].push(w);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-12 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.username}!</h1>
      </header>

      <Leaderboard />
      <div className="mb-8 px-6 md:px-12 py-6">
        <GoalTracker />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-12 py-6">
        <div className="bg-white p-6 rounded-2xl shadow transition duration-300 transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2"><span className="text-2xl bg-yellow-100 p-2 rounded-full mr-2">🏆</span>Level {user.level}</h2>
          <p className="text-gray-500">Keep training to level up!</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow transition duration-300 transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2"><span className="text-2xl bg-blue-100 p-2 rounded-full mr-2">🧠</span>XP Progress</h2>
          <p className="text-sm text-gray-500 mb-2">{user.xp} / {xpToNextLevel} XP</p>
          <div className="w-full bg-gray-200 h-4 rounded-full">
            <div
              className="h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4"><span className="text-2xl bg-green-100 p-2 rounded-full mr-2">📈</span>Your Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded-xl text-center transition duration-300 transform hover:scale-105 hover:shadow">
              <p className="text-lg font-bold">{earnedWorkouts}</p>
              <p className="text-sm text-gray-500">Workouts Completed</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl text-center transition duration-300 transform hover:scale-105 hover:shadow">
              <p className="text-lg font-bold">{strengthLabel} (+{strengthGainPercent}%)</p>
              <p className="text-sm text-gray-500">Strength Gain</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl text-center transition duration-300 transform hover:scale-105 hover:shadow">
              <p className="text-lg font-bold">{goalProgressDisplay}</p>
              <p className="text-sm text-gray-500">Goal Progress</p>
            </div>
          </div>
        </div>

        {/* Weekly Plan */}
        <div className="bg-white p-6 rounded-2xl shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4"><span className="text-2xl bg-purple-100 p-2 rounded-full mr-2">📅</span>Weekly Workout Schedule</h2>
          <div className="grid grid-cols-7 divide-x divide-gray-200 border border-gray-200 rounded-lg overflow-hidden text-center text-sm">
            {days.map((day) => (
              <div key={day} className="p-2 min-h-32">
                <h4 className="font-semibold text-gray-700 mb-2">{day}</h4>
                {workoutsByDay[day].length === 0 ? (
                  <p className="text-gray-400">No workout</p>
                ) : (
                  workoutsByDay[day].map((workout) => (
                    <div key={workout.id} className="mb-2 p-2 rounded-lg bg-blue-100 transition duration-300 transform hover:scale-105 hover:shadow">
                      <p className="font-medium text-gray-800 text-sm"><span className="text-lg mr-1">🏋️</span>{workout.title}</p>
                      <p className="text-xs text-gray-600">{workout.duration} min</p>
                      <p className="text-xs italic text-gray-400">{workout.notes}</p>
                      <button
                        onClick={() => handleEarnXPAndDelete(workout.user_id, workout.id)}
                        className="text-xs text-blue-600 hover:underline mt-1"
                      >
                        🏋️ Earn XP
                      </button>
                      <button
                        onClick={() => handleDeleteWorkout(workout.id)}
                        className="text-xs text-red-500 hover:underline block"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Workout */}
        <div className="bg-white p-6 rounded-2xl shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4"><span className="text-2xl bg-indigo-100 p-2 rounded-full mr-2">➕</span>Add New Workout</h2>
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" value={form.title} onChange={handleFormChange} placeholder="Title" className="p-2 border rounded" required />
            <input name="category" value={form.category} onChange={handleFormChange} placeholder="Category" className="p-2 border rounded" required />
            <input name="duration" value={form.duration} onChange={handleFormChange} placeholder="Duration (minutes)" className="p-2 border rounded" type="number" required />
            <input name="date" value={form.date} onChange={handleFormChange} placeholder="Date (YYYY-MM-DD)" className="p-2 border rounded" required />
            <textarea name="notes" value={form.notes} onChange={handleFormChange} placeholder="Notes (optional)" className="p-2 border rounded md:col-span-2" />
            <button type="submit" className="bg-primary text-white py-2 rounded hover:bg-blue-700 transition md:col-span-2">➕ Submit Workout</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
