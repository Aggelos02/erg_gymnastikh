import React from 'react';

const HeroImage = () => {
  return (
    <div className="hero-image">
      <img
        src="https://via.placeholder.com/600x300"
        alt="Fitness Banner"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );
};

export default HeroImage;
