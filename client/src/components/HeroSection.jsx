import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 via-cyan-500 to-green-400 text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Organize & Monitor Your Gym Workouts with AI
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Create personalized exercise programs, track your performance, and achieve your fitness goals faster with our intelligent monitoring system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition duration-300 text-center">
                Start Free Trial
              </a>
              <a href="#features" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-300 text-center">
                Explore Features
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gray-100 p-4 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-sm text-gray-600">AI Workout Dashboard</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-dark">Weekly Plan</h3>
                  <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full">AI Generated</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center py-2 rounded bg-gray-100 text-dark font-medium">Mon</div>
                  <div className="text-center py-2 rounded bg-gray-100 text-dark font-medium">Wed</div>
                  <div className="text-center py-2 rounded bg-gray-100 text-dark font-medium">Fri</div>
                  <div className="text-center py-2 rounded bg-primary bg-opacity-10 text-primary">Upper</div>
                  <div className="text-center py-2 rounded bg-secondary bg-opacity-10 text-secondary">Lower</div>
                  <div className="text-center py-2 rounded bg-accent bg-opacity-10 text-accent">Cardio</div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-dark">Current Goal Progress</span>
                    <span className="text-sm font-medium text-primary">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg hidden md:block">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary mr-3">
                  <i className="fas fa-robot text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium text-dark">AI Assistant</h4>
                  <p className="text-sm text-gray-500">Ready to help</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
