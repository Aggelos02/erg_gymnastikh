import React from 'react';

function HeroImage() {
  return (
    <div style={styles.container}>
      <img
        src="https://placehold.co/600x400"
        alt="Εικόνα επικοινωνίας"
        style={styles.image}
      />
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
  }
};

export default HeroImage;