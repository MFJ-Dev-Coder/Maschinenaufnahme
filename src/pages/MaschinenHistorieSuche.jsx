import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function MaschinenHistorieSuche() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);   
  const navigate = useNavigate();

  const sucheMaschine = async (
  internnummer = search
) => {

  const response = await fetch(
    `/api/device/${internnummer}`
  );

  const data = await response.json();

  setResults(data);
};

useEffect(() => {

  fetch("/api/devices")
    .then((res) => res.json())
    .then((data) => setResults(data));

}, []);

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
  className="button button--ghost history-back-button"
  onClick={() => navigate("/")}
>
  ← Zurück
</button>
    </div>

    <input
      type="text"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      placeholder="Internnummer eingeben"
    />

    <button onClick={sucheMaschine}>
      Suchen
    </button>

<table className="history-table">

  <thead>
    <tr>
      <th>Internnummer</th>
      <th>Hersteller</th>
      <th>Typ</th>
    </tr>
  </thead>

  <tbody>

    {results
      .filter((item) =>
        item.internnummer
          ?.toString()
          .includes(search)
      )
      .map((item) => (

        <tr
          key={item.id}
          style={{ cursor: "pointer" }}
          onClick={() =>
            sucheMaschine(item.internnummer)
          }
        >
          <td>{item.internnummer}</td>
          <td>{item.hersteller}</td>
          <td>{item.typ}</td>
        </tr>

      ))}

  </tbody>

</table>
  </div>
);
}