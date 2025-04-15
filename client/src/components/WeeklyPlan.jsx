import React from 'react';

const WeeklyPlan = () => {
  const plan = [
    { day: 'Δευτέρα', activity: 'Πόδια & Cardio' },
    { day: 'Τρίτη', activity: 'Άνω Σώμα' },
    { day: 'Τετάρτη', activity: 'Yoga / Ξεκούραση' },
    { day: 'Πέμπτη', activity: 'Πλάτη & Κοιλιακοί' },
    { day: 'Παρασκευή', activity: 'Στήθος & Cardio' },
    { day: 'Σάββατο', activity: 'Ολόσωμη Προπόνηση' },
    { day: 'Κυριακή', activity: 'Ξεκούραση' },
  ];

  return (
    <div className="weekly-plan">
      <h2 style={{ marginBottom: '1rem', color: '#d3195a' }}>Εβδομαδιαίο Πρόγραμμα</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={styles.th}>Ημέρα</th>
            <th style={styles.th}>Δραστηριότητα</th>
          </tr>
        </thead>
        <tbody>
          {plan.map((item, index) => (
            <tr key={index}>
              <td style={styles.td}>{item.day}</td>
              <td style={styles.td}>{item.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  th: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    border: '1px solid #ccc',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    border: '1px solid #ccc',
  },
};

export default WeeklyPlan;
