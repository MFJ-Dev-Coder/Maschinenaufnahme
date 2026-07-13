import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Bitte Benutzername und Passwort eingeben.');
      return;
    }

    const success = login(username, password);

    if (success) {
      navigate('/', { replace: true });
      return;
    }

    setError('Ungültige Anmeldedaten. Bitte erneut versuchen.');
  };

  return (
    <div className="page page--center">
      <div className="card card--narrow">
        <h1>Geräteaufnahme</h1>
        <p className="subtitle">Bitte melden Sie sich an.</p>

        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Benutzername</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              placeholder="admin"
            />
          </label>

          <label className="field">
            <span>Passwort</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </label>

          {error && <p className="message message--error">{error}</p>}

          <button type="submit" className="button button--primary">
            Anmelden
          </button>
        </form>

        <p className="hint">
            Die Zugangsdaten (Benutzername und Passwort) erhalten Sie vom Administrator.
        </p>
      </div>
    </div>
  );
}
