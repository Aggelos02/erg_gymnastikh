import React from 'react';

function ContactForm() {
  return (
    <section className="card">
      <h2 className="section-title">ΡΩΤΗΣΕ ΜΑΣ</h2>
      <p className="section-subtitle">Ο,ΤΙ ΣΕ ΑΠΑΣΧΟΛΕΙ</p>
      <p className="section-desc">
        Διάβασε τις πηγές του site μας και τις συχνές ερωτήσεις και συνεχώς
        αν έχεις απορίες; Στείλε μας ένα μήνυμα και θα σου απαντήσουμε ΑΜΕΣΑ!
      </p>

      <form className="contact-form">
        <input type="text" placeholder="Ονοματεπώνυμο *" required />
        <div className="dual-inputs">
          <input type="tel" placeholder="Κινητό" />
          <input type="email" placeholder="E-mail *" required />
        </div>
        <select>
          <option>Επιλογή θέματος</option>
          <option>Συνεργασία</option>
          <option>Τεχνική Υποστήριξη</option>
        </select>
        <textarea rows="4" placeholder="Μήνυμα"></textarea>

        <div className="captcha-placeholder">
          <input type="checkbox" id="captcha" />
          <label htmlFor="captcha">Δεν είμαι ρομπότ</label>
        </div>

        <button type="submit" className="btn">ΑΠΟΣΤΟΛΗ</button>
      </form>
    </section>
  );
}

export default ContactForm;
