import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExerciseLibrary = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/exercises')
      .then(response => setExercises(response.data))
      .catch(error => console.error('Error fetching exercises:', error));
  }, []);

  return (
    <section id="exercise-library" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark mb-4">Exercise Library</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive collection of exercises with detailed instructions and form guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Static Exercises */}
          {[
            {
              name: 'Barbell Squat',
              category: 'Legs',
              description: 'Compound exercise that works your quads, hamstrings, and glutes.',
              stars: 4.5
            },
            {
              name: 'Bench Press',
              category: 'Chest',
              description: 'Classic upper body exercise targeting chest, shoulders, and triceps.',
              stars: 5
            },
            {
              name: 'Deadlift',
              category: 'Full Body',
              description: 'Powerful exercise that engages your posterior chain and core.',
              stars: 5
            }
          ].map((exercise, index) => (
            <div key={index} className="exercise-card bg-white rounded-xl overflow-hidden shadow-sm transition duration-300 transform hover:scale-105">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <i className="fas fa-dumbbell text-5xl text-gray-400"></i>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-dark">{exercise.name}</h3>
                  <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full">{exercise.category}</span>
                </div>
                <p className="text-gray-600 mb-4">{exercise.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1 text-yellow-400">
                    {[...Array(Math.floor(exercise.stars))].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                    {exercise.stars % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
                  </div>
                  <a href="#" className="text-primary font-medium text-sm hover:underline">View Details</a>
                </div>
              </div>
            </div>
          ))}

          {/* Dynamic Exercises from DB */}
          {exercises.map((ex, idx) => (
            <div key={`db-${idx}`} className="exercise-card bg-white rounded-xl overflow-hidden shadow-sm transition duration-300 transform hover:scale-105">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <i className="fas fa-dumbbell text-5xl text-gray-400"></i>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-dark">{ex.name}</h3>
                  <span className="text-xs bg-accent bg-opacity-10 text-accent px-2 py-1 rounded-full">{ex.category}</span>
                </div>
                <p className="text-gray-600 mb-4">{ex.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1 text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                  <a href="#" className="text-primary font-medium text-sm hover:underline">View Details</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-blue-700 transition duration-300"
          >
            Browse All Exercises
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExerciseLibrary;
