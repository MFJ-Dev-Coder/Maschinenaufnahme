import React from "react";

export default function ChecklistTable({ sections }) {
  return (
    <div>
      {sections.map((section) => (
        <div key={section.title} style={{ marginBottom: "20px" }}>
          
          <h3>{section.title}</h3>

          <table style={{
            borderCollapse: "collapse",
            width: "100%"
          }}>
            <thead>
              <tr>
                <th style={{ width: "30px", border: "1px solid black" }}></th>
                <th style={{ border: "1px solid black" }}>Prüfpunkt</th>
                <th style={{ border: "1px solid black" }}>Eintrag</th>
              </tr>
            </thead>

            <tbody>
              {section.items.map((item) => (
                <tr key={item.id}>
                  
                  {/* ✅ Checkbox */}
                  <td style={{ border: "1px solid black", textAlign: "center" }}>
                    <input type="checkbox" />
                  </td>

                  {/* ✅ Text */}
                  <td style={{ border: "1px solid black" }}>
                    {item.label}
                  </td>

                  {/* ✅ Eingabefeld */}
                  <td style={{ border: "1px solid black" }}>
                    {item.hasInput && (
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          border: "none",
                          borderBottom: "1px solid black"
                        }}
                      />
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      ))}
    </div>
  );
}