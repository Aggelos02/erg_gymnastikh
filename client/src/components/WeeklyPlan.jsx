import React from 'react';

function WeeklyPlan() {
  const schedule = [
    { day: 'Δευτέρα', activity: 'Πόδια & Cardio' },
    { day: 'Τρίτη', activity: 'Άνω Σώμα' },
    { day: 'Τετάρτη', activity: 'Yoga / Ξεκούραση' },
    { day: 'Πέμπτη', activity: 'Πλάτη & Κοιλιακοί' },
    { day: 'Παρασκευή', activity: 'Στήθος & Cardio' },
    { day: 'Σάββατο', activity: 'Ολόσωμη προπόνηση' },
    { day: 'Κυριακή', activity: 'Ξεκούραση' },
  ];

  return (
    <section className="weekly-plan" style={{ textAlign: 'center', padding: '2rem' }}>
      <h2 style={{ color: '#f43f5e', marginBottom: '1rem' }}>Εβδομαδιαίο Πρόγραμμα</h2>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={cellStyle}>Ημέρα</th>
            <th style={cellStyle}>Δραστηριότητα</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, idx) => (
            <tr key={idx}>
              <td style={cellStyle}>{item.day}</td>
              <td style={cellStyle}>{item.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

const cellStyle = {
  border: '1px solid #ccc',
  padding: '8px 16px',
  color: '#fff',
};

export default WeeklyPlan;
