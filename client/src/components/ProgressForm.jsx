import React, { useState } from 'react';

function ProgressForm() {
  const [formData, setFormData] = useState({
    user: '',
    type: '',
    duration: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
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
      alert('✅ Καταχωρήθηκε επιτυχώς!');
      setFormData({ user: '', type: '', duration: '', date: '' });
    } else {
      alert('❌ Σφάλμα κατά την υποβολή!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="progress-form">
      <h2>Καταγραφή Προπόνησης</h2>
      <input name="user" placeholder="Όνομα χρήστη" value={formData.user} onChange={handleChange} />
      <input name="type" placeholder="Τύπος άσκησης" value={formData.type} onChange={handleChange} />
      <input name="duration" placeholder="Διάρκεια (λεπτά)" value={formData.duration} onChange={handleChange} />
      <input name="date" type="date" value={formData.date} onChange={handleChange} />
      <button type="submit">Καταχώρηση</button>
    </form>
  );
}

export default ProgressForm;
