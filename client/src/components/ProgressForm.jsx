import React, { useState } from 'react';

const ProgressForm = () => {
  const [formData, setFormData] = useState({
    user: '',
    type: '',
    duration: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      alert('✅ Καταχωρήθηκε!');
      setFormData({ user: '', type: '', duration: '', date: '' });
    } else {
      alert('❌ Σφάλμα στην αποστολή!');
    }
  };

  return (
    <form className="progress-form" onSubmit={handleSubmit}>
      <h2>Καταγραφή Προπόνησης</h2>
      <input
        type="text"
        name="user"
        value={formData.user}
        onChange={handleChange}
        placeholder="Όνομα χρήστη"
        required
      />
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Τύπος άσκησης"
        required
      />
      <input
        type="number"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Διάρκεια (λεπτά)"
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <button type="submit">Καταχώρηση</button>
    </form>
  );
};

export default ProgressForm;
