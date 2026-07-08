import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="page page--center">
          <div className="card card--narrow">
            <h1>Fehler beim Laden</h1>
            <p className="subtitle">
              Die App konnte nicht gestartet werden. Bitte Seite neu laden oder den
              Dev-Server prüfen.
            </p>
            <p className="message message--error">
              {this.state.error?.message ?? 'Unbekannter Fehler'}
            </p>
            <button
              type="button"
              className="button button--primary"
              onClick={() => window.location.reload()}
            >
              Seite neu laden
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
