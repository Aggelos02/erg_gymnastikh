import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

const ChartsPage = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const [xpData, setXpData] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    axios.get(`http://localhost:3001/api/workout-history/${userId}`)
      .then((res) => {
        const workouts = res.data;

        // 🏋️ Workouts per Week
        const dayMap = {};
        workouts.forEach((w) => {
          const day = new Date(w.date).toLocaleDateString('en-US', { weekday: 'long' });
          if (!dayMap[day]) dayMap[day] = { day, workouts: 0 };
          dayMap[day].workouts += 1;
        });

        const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const formattedData = dayOrder.map((day) => dayMap[day] || { day, workouts: 0 });
        setWorkoutData(formattedData);

        // ⚡ XP Progression per Week (based on real xp_gain values)
        let cumulativeXP = 0;
        const xpProgression = workouts.map((w, i) => {
          cumulativeXP += w.xp_gain || 0;
          return {
            name: `Workout ${i + 1}`,
            xp: cumulativeXP
          };
        });
        setXpData(xpProgression);
      });

    // 📅 Weekly Stats
    axios.get(`http://localhost:3001/api/weekly-stats/${userId}`).then((res) => {
      setWeeklyStats(res.data);
    });
  }, []);

  const formatDayRange = (start, end) => {
    const options = { weekday: 'long' };
    const startDay = new Date(start).toLocaleDateString('en-US', options);
    const endDay = new Date(end).toLocaleDateString('en-US', options);
    return `${startDay} - ${endDay}`;
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">📊 Your Training Charts</h1>

      {/* 🏋️ Workouts per Week */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">🏋️ Workouts per Week</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={workoutData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="workouts" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ⚡ XP Progression per Week */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">⚡ XP Progression per Week</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={xpData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="xp" stroke="#10B981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📅 Weekly Stats */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">📅 Weekly Stats History</h2>
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Week</th>
              <th className="p-2">Total Workouts</th>
              <th className="p-2">Total XP</th>
            </tr>
          </thead>
          <tbody>
            {weeklyStats.map((stat, i) => (
              <tr key={i} className="border-b hover:bg-gray-100">
                <td className="p-2">{formatDayRange(stat.week_start, stat.week_end)}</td>
                <td className="p-2">{stat.total_workouts}</td>
                <td className="p-2">{stat.total_xp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChartsPage;
