import React from 'react';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const getDayName = (dateStr) => {
  const date = new Date(dateStr);
  const dayIndex = date.getDay();
  return days[(dayIndex + 6) % 7]; // adjust because JS getDay() starts from Sunday
};

const groupWorkoutsByDay = (workouts) => {
  const grouped = {};
  days.forEach((day) => (grouped[day] = []));
  workouts.forEach((workout) => {
    const dayName = getDayName(workout.date);
    grouped[dayName].push(workout);
  });
  return grouped;
};

const WorkoutHistoryGrid = ({ workouts, onDelete, onAddXP }) => {
  const groupedWorkouts = groupWorkoutsByDay(workouts);

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">🗓️ Workout History</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Days */}
        <div className="grid grid-cols-7 divide-x divide-gray-200 border-b border-gray-200">
          {days.map((day) => (
            <div key={day} className="py-3 text-center font-medium text-dark">
              {day}
            </div>
          ))}
        </div>

        {/* Workouts */}
        <div className="grid grid-cols-7 divide-x divide-gray-200">
          {days.map((day) => (
            <div key={day} className="p-3 min-h-40">
              {groupedWorkouts[day].length === 0 ? (
                <div className="text-center text-gray-400 text-sm">No workout</div>
              ) : (
                groupedWorkouts[day].map((workout) => (
                  <div key={workout.id} className="mb-3 p-3 bg-blue-50 rounded-lg text-center">
                    <h4 className="font-semibold text-gray-800 text-sm">{workout.title}</h4>
                    <p className="text-xs text-gray-500">
                      {workout.category} • {workout.duration} min
                    </p>
                    <p className="text-xs italic text-gray-400 mb-1">{workout.notes}</p>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onAddXP(workout.id)}
                        className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        🏋️ Earn XP
                      </button>
                      <button
                        onClick={() => onDelete(workout.id)}
                        className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutHistoryGrid;
