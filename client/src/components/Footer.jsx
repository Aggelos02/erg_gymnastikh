import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
        {/* Branding */}
        <div className="mb-6 md:mb-0">
          <div className="flex items-center mb-4">
            <i className="fas fa-dumbbell text-primary text-2xl mr-2"></i>
            <span className="text-xl font-bold">Gym Master</span>
          </div>
          <p className="text-gray-400 text-sm">
            Organize and monitor your gym workouts easily.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition duration-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition duration-300">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div className="text-sm">
          <h3 className="font-semibold text-white mb-3">Product</h3>
          <ul className="space-y-2">
            <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
            <li><a href="#exercise-library" className="text-gray-400 hover:text-white transition">Exercise Library</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-400">
        <p>© 2025 Gym Master. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
