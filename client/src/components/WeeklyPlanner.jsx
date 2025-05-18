import React from 'react';

const WeeklyPlanner = () => {
  return (
    <section id="weekly-plan" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark mb-4">Weekly Planning</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Create the perfect weekly workout schedule based on your goals and availability.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Days of the week */}
          <div className="grid grid-cols-7 divide-x divide-gray-200 border-b border-gray-200">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="py-3 text-center font-medium text-dark">{day}</div>
            ))}
          </div>

          {/* Workout plan */}
          <div className="grid grid-cols-7 divide-x divide-gray-200">
            {/* Monday */}
            <div className="p-4 min-h-40">
              <div className="p-3 rounded-lg bg-primary bg-opacity-10 text-center">
                <h4 className="font-medium text-dark mb-1">Upper Body</h4>
                <p className="text-xs text-gray-500">45 min</p>
              </div>
            </div>

            {/* Tuesday */}
            <div className="p-4 min-h-40">
              <div className="p-3 rounded-lg bg-gray-100 text-center">
                <p className="text-sm text-gray-500">Rest Day</p>
              </div>
            </div>

            {/* Wednesday */}
            <div className="p-4 min-h-40">
              <div className="p-3 rounded-lg bg-secondary bg-opacity-10 text-center">
                <h4 className="font-medium text-dark mb-1">Lower Body</h4>
                <p className="text-xs text-gray-500">50 min</p>
              </div>
            </div>

            {/* Thursday */}
            <div className="p-4 min-h-40">
              <div className="p-3 rounded-lg bg-gray-100 text-center">
                <p className="text-sm text-gray-500">Rest Day</p>
              </div>
            </div>

            {/* Friday */}
            <div className="p-4 min-h-40">
              <div className="p-3 rounded-lg bg-accent bg-opacity-10 text-center">
                <h4 className="font-medium text-dark mb-1">Cardio</h4>
                <p className="text-xs text-gray-500">30 min</p>
              </div>
            </div>

            {/* Saturday */}
            <div className="p-4 min-h-40">
              <div className="p-3 rounded-lg bg-purple-500 bg-opacity-10 text-center">
                <h4 className="font-medium text-dark mb-1">Full Body</h4>
                <p className="text-xs text-gray-500">60 min</p>
              </div>
            </div>

            {/* Sunday */}
            <div className="p-4 min-h-40">
              <div className="p-3 rounded-lg bg-gray-100 text-center">
                <p className="text-sm text-gray-500">Active Recovery</p>
              </div>
            </div>
          </div>

          {/* Generate Plan Button */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-600 mb-4 sm:mb-0">
                Need to adjust your schedule? You can adjust your schedule anytime.
              </p>
              <button className="px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-blue-700 transition duration-300">
                Create Plan
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WeeklyPlanner;
