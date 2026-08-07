import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MaschinenHistorieSuche() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/devices")
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) =>
        console.error("Fehler beim Laden:", err)
      );
  }, []);

  const filteredResults = results.filter(
    (entry) =>
      (entry.internnummer || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (entry.typ || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="header">
        <div>
          <h1>Maschinenhistorie</h1>
          <p className="subtitle">
            Historische Maschinenkarten anzeigen
          </p>
        </div>

        <button
          className="button button--ghost"
          onClick={() => navigate("/")}
        >
          Zurück
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Internnummer oder Typ suchen..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Internnummer</th>
              <th>Typ</th>
              <th>Erstellungsdatum</th>
            </tr>
          </thead>

          <tbody>
            {filteredResults.map((entry) => (
              <tr
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className="history-row"
              >
                <td>{entry.internnummer}</td>
                <td>{entry.typ}</td>
                <td>
                  {new Date(entry.erstellt_am).toLocaleDateString("de-DE")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEntry && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedEntry(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setSelectedEntry(null)}
            >
              ✕
            </button>

            <h2>Maschinenkarte</h2>

            <div className="info-grid">
              <div>
                <strong>Auftrag</strong>
                <p>{selectedEntry.arbeitsauftrag || "Keine Angabe"}</p>
              </div>

              <div>
                <strong>Techniker</strong>
                <p>{selectedEntry.techniker || "Keine Angabe"}</p>
              </div>

              <div>
                <strong>Datum</strong>
                <p>
                  {new Date(selectedEntry.erstellt_am).toLocaleDateString("de-DE")}
                </p>
              </div>

              <div>
                <strong>Seriennummer</strong>
                <p>{selectedEntry.seriennummer || "Keine Angabe"}</p>
              </div>
            </div>

            {selectedEntry.pdf_url && (
              <a
                href={selectedEntry.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="button button--ghost"
              >
                📄 PDF herunterladen
              </a>
            )}
          </div>
                </div>
      )}
    </div>
  );
}