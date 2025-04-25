💪 AI Gym Master - Σύστημα Οργάνωσης & Παρακολούθησης Προπονήσεων

📚 Μάθημα: Εργασία για το μάθημα Γυμναστική / Φυσική Αγωγή

👥 Συμμετέχοντες

Άγγελος (@Aggelos02)

Κώστας (@Konstantinos820)

🧩 Περιγραφή

Αναπτύξαμε μία μοντέρνα και πλήρως λειτουργική ιστοσελίδα χρησιμοποιώντας React για το frontend και Node.js + SQLite για το backend, με σκοπό την οργάνωση και παρακολούθηση καθημερινών προπονήσεων, στόχων και ατομικής προόδου.

🔧 Βασικές Λειτουργίες

Δημιουργία και διαχείριση λογαριασμού χρήστη (Login, Sign Up, Forgot Password, Reset Password)

Βιβλιοθήκη ασκήσεων με δυνατότητα προσθήκης και διαγραφής

Δημιουργία εβδομαδιαίου πλάνου άσκησης

Καταγραφή προόδου και επιδόσεων

Προβολή στόχων και οπτική πρόοδος

Πλήρες responsive UI με TailwindCSS

👨‍🔧 Κατανομή Εργασιών

Άγγελος

Ρύθμιση React App με Vite και TailwindCSS

Δημιουργία component-based αρχιτεκτονικής (Hero, Features, Footer, Weekly Plan)

Ρύθμιση GitHub repository & αρχικά push

Ενσωμάτωση API endpoints στο frontend

Κώστας

Setup Express server και βάση δεδομένων SQLite

Δημιουργία όλων των backend routes (login, signup, delete, exercises, users κ.λπ.)

Υλοποίηση Forgot Password / Reset Password μέσω email

UI βελτιώσεις & προσθήκη συστήματος Avatar και Pop-up Menu στο Header

🖥️ Οδηγίες Εκτέλεσης

1. Εκκίνηση Frontend (React)

cd client
npm install
npm run dev

➡️ Άνοιγμα στο: http://localhost:5173

2. Εκκίνηση Backend (Express + SQLite)

cd server
npm install
node index.js

➡️ Server στο: http://localhost:3001

3. Προβολή Χρηστών (API endpoint):

http://localhost:3001/api/users

📁 Δομή Project

├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── App.jsx
├── server
│   ├── index.js
│   └── gym.db

📝 Ιστορικό Αλλαγών

Μπορείτε να δείτε όλη την πορεία ανάπτυξης, commits και αλλαγές στο GitHub Commit History