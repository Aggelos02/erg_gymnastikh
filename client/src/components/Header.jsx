import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  // Ελέγχουμε αν υπάρχει ο χρήστης στο localStorage
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  
  const [showMenu, setShowMenu] = useState(false);  // Για το pop-up menu

  const handleLogout = () => {
    // Διαγραφή του χρήστη από το localStorage κατά το logout
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    window.location.href = '/';  // Ανακατεύθυνση στην αρχική σελίδα μετά το logout
  };

  const handleDeleteAccount = async () => {
    if (!userId) return;
    
    try {
      // Διαγραφή του χρήστη από τη βάση δεδομένων στο backend
      const response = await fetch(`http://localhost:3001/api/delete-user/${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        // Διαγραφή από το localStorage και ανακατεύθυνση στην αρχική σελίδα
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        alert('Account deleted successfully');
        window.location.href = '/';
      } else {
        alert(data.error || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while deleting the account.');
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';  // Παίρνει το αρχικό του χρήστη
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo - Refreshes home */}
          <div className="flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
            <i className="fas fa-dumbbell text-primary text-2xl mr-2"></i>
            <span className="text-xl font-bold text-dark">AI Gym Master</span>
          </div>

          {/* Back link if on login/signup */}
          {isAuthPage ? (
            <div>
              <a
                href="/"
                className="text-dark font-medium border-b-2 border-transparent hover:border-primary hover:text-primary transition duration-200"
              >
                Back to the home page
              </a>
            </div>
          ) : (
            <>
              {/* Navigation Links */}
              <div className="hidden md:flex md:items-center md:space-x-8">
                <a href="#" className="text-dark font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition duration-200">Home</a>
                <a href="#features" className="text-dark font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition duration-200">Features</a>
                <a href="#exercise-library" className="text-dark font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition duration-200">Exercise Library</a>
                <a href="#progress" className="text-dark font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition duration-200">Progress</a>
                <a href="#weekly-plan" className="text-dark font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition duration-200">Weekly Plan</a>
              </div>

              {/* Login / Sign Up or Avatar and logout */}
              <div className="hidden md:flex md:items-center space-x-3">
                {userId ? (
                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer"
                      onClick={() => setShowMenu(!showMenu)}  // Toggle pop-up menu
                    >
                      {getInitial(username)}  {/* Initial of the user */}
                    </div>

                    {/* Pop-up menu */}
                    {showMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                        <div
                          className="px-4 py-2 text-dark font-medium hover:bg-gray-100 cursor-pointer"
                          onClick={() => alert('Go to Settings')}  // Placeholder for settings
                        >
                          Settings
                        </div>
                        <div
                          className="px-4 py-2 text-dark font-medium hover:bg-gray-100 cursor-pointer"
                          onClick={handleDeleteAccount}  // Delete Account
                        >
                          Delete Account
                        </div>
                        <div
                          className="px-4 py-2 text-dark font-medium hover:bg-gray-100 cursor-pointer"
                          onClick={handleLogout}  // Logout
                        >
                          Logout
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="px-4 py-2 rounded-md text-primary font-medium border border-primary hover:bg-primary hover:text-white transition duration-300"
                    >
                      Login
                    </a>
                    <a
                      href="/signup"
                      className="px-4 py-2 rounded-md bg-primary text-white font-medium hover:bg-blue-700 transition duration-300"
                    >
                      Sign Up
                    </a>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
