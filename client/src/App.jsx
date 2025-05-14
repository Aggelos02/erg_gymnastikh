import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import WeeklyPlanner from './components/WeeklyPlanner';
import ExerciseLibrary from './components/ExerciseLibrary';
import ProgressSection from './components/ProgressSection';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword'; 
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; // ✅ προστέθηκε

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const hideFooter = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  return (
    <>
      <ScrollToTopOnRouteChange />
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Features />
              <WeeklyPlanner />
              <ExerciseLibrary />
              <ProgressSection />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
