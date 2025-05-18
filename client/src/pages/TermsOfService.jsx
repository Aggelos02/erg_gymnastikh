// TermsOfService.jsx

import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">
        By using <strong>Gym Master</strong>, you agree to the following terms and conditions:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>You are responsible for the accuracy of your workout data.</li>
        <li>You agree not to misuse or attempt to access other users’ data.</li>
        <li>This app is provided “as is” for educational or personal use only.</li>
        <li>We may update the app or its features without prior notice.</li>
      </ul>
      <p>
        If you disagree with these terms, please stop using the platform.
      </p>
    </div>
  );
};

export default TermsOfService;
