// PrivacyPolicy.jsx

import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At <strong>Gym Master</strong>, we respect your privacy and are committed to protecting your personal data.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">What Data We Collect</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Email and username upon registration</li>
        <li>Your workouts and performance statistics</li>
        <li>XP, goals, and usage progress</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To provide and improve your workout tracking experience</li>
        <li>To calculate XP, level, and progress statistics</li>
        <li>To generate leaderboards and goal tracking</li>
      </ul>
      <p>
        We do <strong>not</strong> share your data with third parties. Your data is stored locally on our system and used only for functional purposes within this platform.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
