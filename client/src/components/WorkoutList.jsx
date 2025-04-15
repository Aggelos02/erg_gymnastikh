import React, { useEffect, useState } from 'react';
import { FaRunning, FaTrash } from 'react-icons/fa';

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/workouts')
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch((err) => console.error('Σφάλμα κατά την ανάκτηση:', err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/workouts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setWorkouts((prev) => prev.filter((w) => w.id !== id));
      } else {
        console.error('Η διαγραφή απέτυχε στον server');
      }
    } catch (error) {
      console.error('Σφάλμα στη διαγραφή:', error);
    }
  };

  return (
    <section>
      <h2>Καταχωρημένες Προπονήσεις</h2>
      {workouts.length === 0 ? (
        <p>Δεν υπάρχουν καταχωρήσεις ακόμα.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {workouts.map((w) => (
            <li key={w.id} style={{
              background: '#fff',
              marginBottom: '1rem',
              padding: '1rem',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              position: 'relative'
            }}>
              <p><strong>Χρήστης:</strong> {w.user}</p>
              <p><FaRunning style={{ marginRight: '5px' }} /><strong>Άσκηση:</strong> {w.type}</p>
              <p><strong>Διάρκεια:</strong> {w.duration} λεπτά</p>
              <p><strong>Ημερομηνία:</strong> {w.date}</p>
              <button
                onClick={() => handleDelete(w.id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#e63946',
                  fontSize: '1.2rem'
                }}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default WorkoutList;
