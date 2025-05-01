import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/forgot-password', { email });
      setMessage(response.data.message);
      setError('');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setMessage('');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/reset-password', {
        email,
        newPassword,
      });
      setMessage(response.data.message);
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-dark">Enter Your Email</h2>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full mb-6 px-4 py-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition">
                Continue
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-dark">Reset Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="New Password"
                className="w-full mb-4 px-4 py-2 border rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full mb-6 px-4 py-2 border rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition">
                Reset Password
              </button>
            </form>
          </>
        )}

        {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
