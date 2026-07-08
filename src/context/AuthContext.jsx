import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'admin';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('geraeteaufnahme_auth') === 'true',
  );

  const login = (username, password) => {
    const success =
      username.trim() === VALID_USERNAME && password === VALID_PASSWORD;

    if (success) {
      sessionStorage.setItem('geraeteaufnahme_auth', 'true');
      setIsAuthenticated(true);
    }

    return success;
  };

  const logout = () => {
    sessionStorage.removeItem('geraeteaufnahme_auth');
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth muss innerhalb von AuthProvider verwendet werden.');
  }

  return context;
}
