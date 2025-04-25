import React from 'react';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark mb-4">Core Features</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to organize and monitor your gym workouts effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center text-primary mb-4">
              <i className="fas fa-plus-circle text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-dark mb-3">Create Programs</h3>
            <p className="text-gray-600">
              Build customized workout plans tailored to your fitness level and goals with our intuitive program builder.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-lg bg-secondary bg-opacity-10 flex items-center justify-center text-secondary mb-4">
              <i className="fas fa-chart-line text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-dark mb-3">Track Progress</h3>
            <p className="text-gray-600">
              Log your workouts, track performance metrics, and visualize your improvements over time.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-lg bg-accent bg-opacity-10 flex items-center justify-center text-accent mb-4">
              <i className="fas fa-book-open text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-dark mb-3">Exercise Library</h3>
            <p className="text-gray-600">
              Access hundreds of exercises with detailed instructions, videos, and proper form guidance.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-lg bg-purple-500 bg-opacity-10 flex items-center justify-center text-purple-500 mb-4">
              <i className="fas fa-calendar-alt text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-dark mb-3">Weekly Plans</h3>
            <p className="text-gray-600">
              Schedule your workouts for the week with our smart planning tool that balances different muscle groups.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
