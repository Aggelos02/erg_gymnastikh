import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/leaderboard');
        setLeaders(response.data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      }
    };

    if (localStorage.getItem('userId')) {
      fetchLeaderboard();
    }
  }, []);

  if (!localStorage.getItem('userId')) {
    return null;
  }

  // Βαθμολογική κατάταξη με ισοβαθμίες
  let lastXP = null;
  let lastLevel = null;
  let rank = 0;
  let sameRankCount = 0;

  const getRank = (level, xp) => {
    if (level === lastLevel && xp === lastXP) {
      sameRankCount += 1;
    } else {
      rank += 1 + sameRankCount;
      sameRankCount = 0;
    }
    lastLevel = level;
    lastXP = xp;
    return rank;
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-4 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">🏆 Top 3 Users</h2>
      <ol className="space-y-2">
        {leaders.map((user, index) => {
          const currentRank = getRank(user.level, user.xp);
          const isTied =
            index > 0 &&
            user.level === leaders[index - 1].level &&
            user.xp === leaders[index - 1].xp;

          return (
            <li
              key={index}
              className="flex justify-between items-center bg-blue-100 rounded-lg px-4 py-2 hover:scale-105 transition"
            >
              <span className="font-semibold text-blue-800">
                {isTied ? '🟰' : `#${currentRank}`} {user.username}
              </span>
              <span className="text-sm text-blue-900">
                Level: {user.level} | XP: {user.xp}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Leaderboard;
