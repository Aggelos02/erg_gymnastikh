import React from 'react';
import Header from '../components/Header';
import HeroImage from '../components/HeroImage';
import WeeklyPlan from '../components/WeeklyPlan';
import ContactForm from '../components/ContactForm';
import ProgressForm from '../components/ProgressForm';
import Footer from '../components/Footer';
import WorkoutList from '../components/WorkoutList';

function MainPage() {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  })();

  return (
    <>
      <Header />
      <div className="container">
        <main className="main-layout">
          {/* ✅ Εικόνα και καλωσόρισμα (για όλους) */}
          <section id="hero">
            <HeroImage />
          </section>

          {/* ✅ Βασικό πρόγραμμα (για όλους) */}
          <section id="weekly">
            <WeeklyPlan />
          </section>

          {/* ✅ Φόρμα επικοινωνίας (για όλους) */}
          <section id="contact">
            <ContactForm />
          </section>

          {/* ✅ Αν ο χρήστης είναι συνδεδεμένος: Προβολή προπονήσεων */}
          {user ? (
            <>
              <section id="progress">
                <ProgressForm />
              </section>
              <section id="workouts">
                <WorkoutList />
              </section>
            </>
          ) : (
            // ✅ Αν δεν είναι: Πληροφοριακό περιεχόμενο για επισκέπτη
            <section className="guest-info" style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{ color: '#e63946', fontSize: '1.7rem', marginBottom: '1rem' }}>
                Καλώς ήρθες επισκέπτη! 👋
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                Το <strong>AthloPlanAI</strong> είναι η νέα έξυπνη πλατφόρμα για αθλητές κάθε επιπέδου.
                Οργάνωσε τις προπονήσεις σου, παρακολούθησε την πρόοδό σου και επίλεξε AI βοηθό για εξατομικευμένο πλάνο!
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Για να αποκτήσεις πρόσβαση σε όλες τις δυνατότητες, κάνε πρώτα <strong>εγγραφή</strong> ή <strong>σύνδεση</strong>.
              </p>
              <a href="/register" style={{
                display: 'inline-block',
                padding: '0.8rem 1.5rem',
                backgroundColor: '#14a19a',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '8px',
                textDecoration: 'none',
                marginTop: '1rem'
              }}>
                Ξεκίνησε τώρα →
              </a>
            </section>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
