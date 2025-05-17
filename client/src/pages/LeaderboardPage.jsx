import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaderboardPage = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/users')
      .then((res) => {
        const sorted = res.data.sort((a, b) => {
          if (b.level === a.level) return b.xp - a.xp;
          return b.level - a.level;
        });
        setLeaders(sorted);
      })
      .catch((err) => console.error('Failed to fetch users:', err));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-8 tracking-wide">🏆 Global Leaderboard</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <table className="w-full table-auto text-left">
          <thead className="bg-blue-100 text-blue-800 uppercase text-sm">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">Username</th>
              <th className="p-4">Level</th>
              <th className="p-4">XP</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b hover:bg-blue-50 transition ${
                  index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-gray-100' : index === 2 ? 'bg-orange-100' : ''
                }`}
              >
                <td className="p-4 font-bold text-blue-700">#{index + 1}</td>
                <td className="p-4 font-semibold text-gray-800">{user.username}</td>
                <td className="p-4 text-gray-700">{user.level}</td>
                <td className="p-4 text-gray-700">{user.xp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
