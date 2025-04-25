import React from 'react';

const ProgressSection = () => {
  return (
    <section id="progress" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-3xl font-bold text-dark mb-6">Track Your Fitness Journey</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our system automatically records your performance and provides insightful analytics to help you stay on track with your goals.
            </p>

            <div className="space-y-6">
              {/* Item 1 */}
              <div className="flex">
                <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary">
                  <i className="fas fa-weight text-xl"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-dark">Strength Progress</h3>
                  <p className="text-gray-600">Track your lifts and see your strength improvements over time.</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex">
                <div className="w-12 h-12 rounded-full bg-secondary bg-opacity-10 flex items-center justify-center text-secondary">
                  <i className="fas fa-running text-xl"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-dark">Endurance Metrics</h3>
                  <p className="text-gray-600">Monitor your cardio performance and endurance levels.</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex">
                <div className="w-12 h-12 rounded-full bg-accent bg-opacity-10 flex items-center justify-center text-accent">
                  <i className="fas fa-bullseye text-xl"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-dark">Goal Tracking</h3>
                  <p className="text-gray-600">Set and track progress toward your specific fitness objectives.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right content (Progress Box) */}
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-dark">Your Progress This Month</h3>
              <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full">Updated Today</span>
            </div>

            <div className="space-y-6">
              {/* Progress item 1 */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-dark">Workouts Completed</span>
                  <span className="text-sm font-medium text-dark">12/16</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              {/* Progress item 2 */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-dark">Strength Increase</span>
                  <span className="text-sm font-medium text-dark">+8.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-secondary h-2.5 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              {/* Progress item 3 */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-dark">Goal Progress</span>
                  <span className="text-sm font-medium text-dark">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-accent h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-right">
              <a href="#" className="inline-flex items-center text-primary font-medium hover:underline transition duration-300">
                View Detailed Analytics
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
