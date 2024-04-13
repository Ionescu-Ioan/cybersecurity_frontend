// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  setIsLoggedIn: () => {},
  setToken: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  // Load token from local storage on mount (optional)
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Update state based on login/logout actions (implementation omitted)

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, setIsLoggedIn, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
