import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });

      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('xp', response.data.xp);
      localStorage.setItem('level', response.data.level);

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  const handleGuestLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email: "demo@guest.com",
        password: "guest123",
      });

      const { userId, username, xp, level } = response.data;
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("xp", xp);
      localStorage.setItem("level", level);
      navigate("/dashboard");
    } catch (error) {
      console.error("Guest login failed", error);
      setError("Guest login failed. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-dark">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition">
            Login
          </button>

          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full mt-2 bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Try as Guest
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot your password?
          </Link>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
