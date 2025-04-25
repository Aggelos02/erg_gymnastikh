import React, { createContext, useContext, useState } from 'react';

// Δημιουργία του Context
const AuthContext = createContext();

// AuthProvider component που παρέχει το context στα children
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Προσθήκη συνάρτησης login, logout κλπ. για χρήση από τα components
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook για να χρησιμοποιούμε το AuthContext
export const useAuth = () => useContext(AuthContext);
