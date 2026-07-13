import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const USERS = [
  {
    username: "marco",
    password: "1234",
    name: "Marco Fischer-Jung"
  },
  {
    username: "marcel",
    password: "1234",
    name: "Marcel Schindler"
  },
  {
    username: "alin",
    password: "1234",
    name: "Alin Costin"
  },
  {
    username: "tamara",
    password: "1234",
    name: "Tamara Bühler"
  }
];


export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('geraeteaufnahme_auth') === 'true',
  );

  const login = (username, password) => {

  const user = USERS.find(
    u =>
      u.username === username.trim() &&
      u.password === password
  );

  if (!user) {
    return false;
  }

  sessionStorage.setItem(
    "geraeteaufnahme_auth",
    "true"
  );

  sessionStorage.setItem(
    "technician",
    user.name
  );

  setIsAuthenticated(true);

  return true;
};

  const logout = () => {
  sessionStorage.removeItem(
    "geraeteaufnahme_auth"
  );

  sessionStorage.removeItem(
    "technician"
  );

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
