import React from 'react';
import Header from './components/Header';
import HeroImage from './components/HeroImage';
import WeeklyPlan from './components/WeeklyPlan';
import ContactForm from './components/ContactForm';
import ProgressForm from './components/ProgressForm';
import Footer from './components/Footer';
import WorkoutList from './components/WorkoutList';
import './global.css';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <main className="main-layout">
          <section id="hero">
            <HeroImage />
          </section>
          <section id="weekly">
            <WeeklyPlan />
          </section>
          <section id="contact">
            <ContactForm />
          </section>
          <section id="progress">
            <ProgressForm />
          </section>
          <section id="workouts">
            <WorkoutList />
          </section>

        </main>
      </div>
      <Footer />

    </>
  );
}

export default App;
