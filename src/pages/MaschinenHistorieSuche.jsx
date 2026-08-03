import { useState } from "react";
export default function MaschinenHistorieSuche() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const sucheMaschine = async () => {

    const response = await fetch(
      `/api/device/${search}`
    );

    const data = await response.json();

    setResults(data);
  };

  return (
    <div className="page">

      <h1>Maschinenhistorie</h1>

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

      {results.map((item) => (

        <div
          key={item.id}
          className="card"
        >

          <h2>
            {item.hersteller}
            {" "}
            {item.typ}
          </h2>

          <p>
            Internnummer:
            {" "}
            {item.internnummer}
          </p>

          <p>
            Seriennummer:
            {" "}
            {item.seriennummer}
          </p>

          <p>
            Kunde:
            {" "}
            {item.kunde}
          </p>

          <p>
            Techniker:
            {" "}
            {item.techniker}
          </p>

          <p>
            Datum:
            {" "}
            {new Date(
              item.erstellt_am
            ).toLocaleDateString("de-DE")}
          </p>

        </div>

      ))}

    </div>
  );
}