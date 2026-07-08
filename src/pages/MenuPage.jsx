import { Link } from "react-router-dom";
import { CHECKLIST_CATEGORIES } from "../config/checklists";

export default function MenuPage() {
  return (
    <div className="page">
      <h1>Checklisten</h1>
      <p>Bitte wählen Sie eine Kategorie:</p>

      <div className="menu-list">
        {Object.values(CHECKLIST_CATEGORIES).map(cat => (
          <Link key={cat.id} to={`/checklist/${cat.id}`} className="menu-item">
            {cat.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
