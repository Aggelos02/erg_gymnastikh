import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [type, setType] = useState('xp');
  const [target, setTarget] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;
    fetchGoals();
  }, [userId]);

  const fetchGoals = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/goals/${userId}`);
      setGoals(res.data);
    } catch (err) {
      console.error('Failed to fetch goals:', err);
    }
  };

  const deleteGoal = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this goal?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3001/api/goals/${id}`);
      setGoals((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      console.error('Failed to delete goal:', err);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!type || !target) return;

    try {
      await axios.post('http://localhost:3001/api/goals', {
        userId,
        type,
        target: parseInt(target)
      });
      setTarget('');
      fetchGoals();
    } catch (err) {
      console.error('Failed to add goal:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow col-span-1 md:col-span-2 mt-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">🎯 Your Goals</h2>

      {/* Add Goal Form */}
      <form onSubmit={handleAddGoal} className="flex flex-col md:flex-row gap-2 mb-6">
        <select
          className="border rounded p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="xp">XP Goal</option>
          <option value="workouts">Workout Goal</option>
        </select>
        <input
          type="number"
          placeholder="Target value"
          className="border rounded p-2 flex-1"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Add Goal
        </button>
      </form>

      {goals.length === 0 ? (
        <p className="text-gray-500 italic">No goals yet. Add one above!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => {
            const percent = Math.min(100, Math.floor((goal.current / goal.target) * 100));
            const barColor = goal.is_completed
              ? 'bg-green-500'
              : 'bg-yellow-400';

            return (
              <div key={goal.id} className="bg-gray-100 p-4 rounded-xl shadow relative">
                <p className="font-medium text-gray-700 capitalize mb-1">
                  {goal.type} Goal – Target: {goal.target}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Progress: {goal.current} / {goal.target}
                </p>
                <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden mb-3">
                  <div
                    className={`${barColor} h-4 transition-all duration-300`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
                {goal.is_completed ? (
                  <span className="text-green-600 font-semibold text-sm">✅ Completed!</span>
                ) : (
                  <span className="text-yellow-600 font-medium text-sm">In Progress</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GoalTracker;
