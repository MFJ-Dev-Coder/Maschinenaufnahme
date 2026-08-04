import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function MaschinenHistorieSuche() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);   
  const navigate = useNavigate();
  const sucheMaschine = async () => {

    const response = await fetch(
      `/api/device/${search}`
    );

    const data = await response.json();

    setResults(data);
  };

return (
  <div className="page">

    <div className="header">

      <div>
        <h1>Maschinenhistorie</h1>
        <p className="subtitle">
          Suche nach vorhandenen Aufnahmen
        </p>
      </div>

      <button
        className="button button--ghost"
        onClick={() => navigate("/")}
      >
        Zurück
      </button>

    </div>

    {results.map((item) => (

      <div
        key={item.id}
        className="card"
      >

        <h2>
          {item.hersteller} {item.typ}
        </h2>

        <p>
          Internnummer: {item.internnummer}
        </p>

        <p>
          Seriennummer: {item.seriennummer}
        </p>

        <p>
          Kunde: {item.kunde}
        </p>

        <p>
          Techniker: {item.techniker}
        </p>

        <p>
          Datum: {
            new Date(
              item.erstellt_am
            ).toLocaleDateString("de-DE")
          }
        </p>

      </div>

    ))}

  </div>
);
}