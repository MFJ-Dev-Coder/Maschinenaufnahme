import { Link } from "react-router-dom";
import { CHECKLIST_CATEGORIES } from "../config/checklists";

export default function MenuPage() {
  const technician =
  sessionStorage.getItem("technician");
  
  return (
  <div className="page">

    <div className="menu-header">

      <div>
        <h1>Maschinenaufnahme</h1>
        <p>Bitte wählen Sie eine Kategorie.</p>
      </div>

      <div className="user-info">
        <span>Angemeldet als</span>
        <strong>{technician}</strong>
      </div>

    </div>

    <div className="menu-list">
      {Object.values(CHECKLIST_CATEGORIES).map(cat => (
        <Link
          key={cat.id}
          to={`/checklist/${cat.id}`}
          className="menu-item"
        >
          <h2>{cat.title}</h2>
          <p>{cat.description}</p>
        </Link>
      ))}
    </div>

  </div>
);
