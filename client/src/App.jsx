import React from 'react';
import Header from './components/Header';
import HeroImage from './components/HeroImage';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WeeklyPlan from './components/WeeklyPlan';
import ProgressForm from './components/ProgressForm'; 
import './global.css';

function App() {
  return (
    <>
      <Header />
      <main className="main-layout">
        <HeroImage />
        <WeeklyPlan />
        <ContactForm />
        <ProgressForm /> 
      </main>
      <Footer />
    </>
  );
}

export default App;
