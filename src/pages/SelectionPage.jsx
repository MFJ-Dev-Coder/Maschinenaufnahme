import { Link, useNavigate } from "react-router-dom";
import { CHECKLIST_CATEGORIES } from "../config/checklists";
import { useAuth } from "../context/AuthContext";

export default function SelectionPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const technician =
    sessionStorage.getItem("technician");

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>Geräteaufnahme</h1>
          <p className="subtitle">
            Bitte wählen Sie eine Kategorie.
          </p>
        </div>

        <button
          type="button"
          className="button button--ghost"
          onClick={logout}
        >
          Abmelden
        </button>

        <div className="user-info">
          Angemeldet als:
          <strong>{technician}</strong>
        </div>
      </header>

      <div className="selection-grid">

        {Object.values(CHECKLIST_CATEGORIES).map(
          (category) => (
            <Link
              key={category.id}
              to={`/checklist/${category.id}`}
              className="selection-card"
            >
              <h2>{category.title}</h2>

              <p>
                {category.description}
              </p>

              <span className="selection-card__action">
                Checkliste öffnen →
              </span>
            </Link>
          )
        )}

        <div
          className="selection-card"
          onClick={() =>
            navigate("/historie")
          }
          style={{
            cursor: "pointer"
          }}
        >
          <h2>Maschinenhistorie</h2>

          <p>
            Suche nach vorhandenen
            Geräteaufnahmen über die
            Internnummer.
          </p>

          <span className="selection-card__action">
            Historie öffnen →
          </span>
        </div>

      </div>
    </div>
  );
}