import React from 'react';

function ContactForm() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>ΡΩΤΗΣΕ ΜΑΣ</h1>
      <h2 style={styles.subtitle}>Ο,ΤΙ ΣΕ ΑΠΑΣΧΟΛΕΙ</h2>
      <p style={styles.text}>
        Διάβασες τις πηγές του site μας και τις συχνές ερωτήσεις και συνεχίζεις να έχεις απορίες;
        Στείλε μας ένα μήνυμα και θα σου απαντήσουμε ΑΜΕΣΑ!
      </p>

      <form style={styles.form}>
        <input type="text" placeholder="Ονοματεπώνυμο *" style={styles.input} />

        <div style={styles.row}>
          <input type="text" placeholder="Κινητό" style={{ ...styles.input, flex: 1 }} />
          <input type="email" placeholder="E-mail *" style={{ ...styles.input, flex: 1 }} />
        </div>

        <select style={styles.input}>
          <option>Επιλογή θέματος</option>
          <option>Συνεργασία</option>
          <option>Τεχνική Υποστήριξη</option>
          <option>Άλλο</option>
        </select>

        <textarea placeholder="Μήνυμα" style={{ ...styles.input, height: '100px' }}></textarea>

        <div style={styles.row}>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" /> Δεν είμαι ρομπότ
          </label>
          <img
            src="https://placehold.co/100x50"
            alt="reCAPTCHA"
            style={{ marginLeft: '10px' }}
          />
        </div>

        <button type="submit" style={styles.button}>
          ΑΠΟΣΤΟΛΗ
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  title: {
    color: '#ef4444',
    fontSize: '24px',
    marginBottom: '5px'
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px'
  },
  text: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  row: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#444'
  },
  button: {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default ContactForm;