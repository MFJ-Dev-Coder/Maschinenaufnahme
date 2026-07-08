import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { CHECKLIST_CATEGORIES } from "../config/checklists.js";
import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

export default function ChecklistPage() {
  const { categoryId } = useParams();
  const category = CHECKLIST_CATEGORIES[categoryId];

  if (!category) return <div>Kategorie nicht gefunden.</div>;

  const schema = category.schema;
  
  // ✅ META
  const [meta, setMeta] = useState(
    Object.fromEntries(schema.meta.fields.map(f => [f.id, ""]))
  );

  // ✅ SECTIONS (Design + Status Buttons behalten!)
  const [sections, setSections] = useState(
    schema.sections.map(section => ({
      title: section.title,
      items: section.items.map(item => ({
        label: typeof item === "string" ? item : item.label,
        required: item.required || false,
        status: null,
        value: ""
      }))
    }))
  );

  const [decisions, setDecisions] = useState(
    schema.decisionFields
      ? Object.fromEntries(schema.decisionFields.map(f => [f.id, false]))
      : {}
  );

  const [remarks, setRemarks] = useState("");
  const [technician, setTechnician] = useState("");

  // ✅ ✅ NEU: BILDER
  const [images, setImages] = useState({});
  const technicianSignatureRef = useRef(null);

  // ✅ UPDATE
  const updateMeta = (id, value) => {
    setMeta(prev => ({ ...prev, [id]: value }));
  };

  const updateSectionStatus = (sectionIndex, itemIndex, status) => {
    setSections(prev =>
      prev.map((section, sIdx) => {
        if (sIdx !== sectionIndex) return section;

        return {
          ...section,
          items: section.items.map((item, iIdx) => {
            if (iIdx !== itemIndex) return item;
            const newStatus = item.status === status ? null : status;
            return { ...item, status: newStatus };
          })
        };
      })
    );
  };
  const updateSectionValue = (sectionIndex, itemIndex, value) => {
    setSections(prev =>
      prev.map((section, sIdx) => {
        if (sIdx !== sectionIndex) return section;
  
        return {
          ...section,
          items: section.items.map((item, iIdx) => {
            if (iIdx !== itemIndex) return item;
  
            return {
              ...item,
              value
            };
          })
        };
      })
    );
  };

  const updateDecision = (id, value) => {
    setDecisions(prev => ({ ...prev, [id]: value }));
  };

 

  // ✅ BILDER UPLOAD
  const handleImageUpload = (field, file) => {
    setImages(prev => ({
      ...prev,
      [field]: file
    }));
  };

  // ✅ SUBMIT (JETZT MIT FORM DATA + DESIGN)
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      const payload = {
        meta,
        sections,
        decisions,
        remarks,
        technician,
      
        signatures: {
          techniker:
            technicianSignatureRef.current
              ?.getCanvas()
              .toDataURL("image/png")
        }
      };
      
      const missingRequired = [];

sections.forEach(section => {
  section.items.forEach(item => {
    if (item.required && !item.status) {
      missingRequired.push(item.label);
    }
  });
});

if (missingRequired.length > 0) {
  alert(
    "Folgende Pflichtfelder müssen bearbeitet werden:\n\n" +
    missingRequired.join("\n")
  );
  return;
}
      

      formData.append("data", JSON.stringify(payload));

      Object.entries(images).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file);
        }
      });

      const response = await fetch("/sendMail", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const text = await response.text();
        alert("Fehler: " + text);
        return;
      }

      const missingMetaFields = [];

schema.meta.fields.forEach(field => {
  if (
    field.required &&
    (!meta[field.id] || meta[field.id].trim() === "")
  ) {
    missingMetaFields.push(field.label);
  }
});

if (missingMetaFields.length > 0) {
  alert(
    "Folgende Gerätedaten fehlen:\n\n" +
    missingMetaFields.join("\n")
  );
  return;
}

const requiredImages = [
  "Typenschild",
  "Mastnummer",
  "Motornummer",
  "Mastansicht",
  "Reifen vorne",
  "Reifen hinten"
];

const missingImages = requiredImages.filter(
  image => !images[image]
);

if (missingImages.length > 0) {
  alert(
    "Folgende Pflichtbilder fehlen:\n\n" +
    missingImages.join("\n")
  );
  return;
}
      alert("✅ Checkliste erfolgreich gesendet!");

      // ✅ RESET
      setMeta(Object.fromEntries(schema.meta.fields.map(f => [f.id, ""])));

      setSections(
        schema.sections.map(section => ({
          title: section.title,
          items: section.items.map(item => ({
            label: typeof item === "string" ? item : item.label,
            required: item.required || false,
            status: null,
            value: ""
          }))
        }))
      );


      setRemarks("");

      setImages({});

      setTechnician("");
      technicianSignatureRef.current?.clear();

    } catch (err) {
      console.error(err);
      alert("Fehler beim Senden.");
    }
  };

  // ✅ ✅ UI BLEIBT DESIGN (nur erweitert)

  const renderMetaFields = () => (
    <section className="card">
      <h2>Gerätedaten</h2>
      <div className="form">
        {schema.meta.fields.map(field => (
          <label
          key={field.id}
          className={`field ${
            field.required &&
            (!meta[field.id] || meta[field.id].trim() === "")
              ? "required-error"
              : ""
          }`}
        >
            <span>
  {field.label}
  {field.required && (
    <span className="required-badge">*</span>
  )}
</span>
            {field.type === "select" ? (
  <select
    value={meta[field.id] || ""}
    onChange={e => updateMeta(field.id, e.target.value)}
  >
    <option value="">Bitte wählen</option>

    {/* ✅ NORMALER DROPDOWN */}
    {!field.dependsOn &&
      field.options?.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}

    {/* ✅ ABHÄNGIGER DROPDOWN */}
    {field.dependsOn &&
      field.optionsByParent?.[meta[field.dependsOn]]?.map(opt => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
  </select>
) : (
  <input
    type="text"
    value={meta[field.id] || ""}
    onChange={e => updateMeta(field.id, e.target.value)}
  />
)}
          </label>
        ))}
      </div>
    </section>
  );

  const renderSections = () => (
    <section className="card">
      <h2>Prüfpunkte</h2>
      {sections.map((section, sIndex) => (
        <div key={section.title} className="check-section">
          <h3>{section.title}</h3>
          {section.items.map((item, iIndex) => (
            <div
            key={iIndex}
            className={`check-item ${
              item.required && !item.status ? "required-error" : ""
            }`}
          >
              <span>
  {item.label}
  {item.required && (
    <span className="required-badge">*</span>
  )}
</span>
              <div className="status-buttons">
                <button
                  className={item.status === "ok" ? "active" : ""}
                  onClick={() => updateSectionStatus(sIndex, iIndex, "ok")}
                >OK</button>

                <button
                  className={item.status === "fehler" ? "active" : ""}
                  onClick={() => updateSectionStatus(sIndex, iIndex, "fehler")}
                >Fehler</button>
              
<input
  type="text"
  placeholder="Bemerkung / Messwert"
  value={item.value || ""}
  onChange={e =>
    updateSectionValue(sIndex, iIndex, e.target.value)
  }
  style={{
    marginLeft: "10px",
    minWidth: "200px"
  }}
/>



                
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );

  const renderImages = () => (
    <section className="card">
      <h2>Bilder</h2>

      {["Typenschild", "Mastnummer", "Motornummer", "Mastansicht", "Reifen vorne", "Reifen hinten"].map(key => (
        <label key={key} className="field">
          <span>
  {key}
  <span
    style={{
      color: "red",
      fontWeight: "bold",
      marginLeft: "4px"
    }}
  >
    *
  </span>
</span>
          <input
  key={`${key}-${Object.keys(images).length}`}
  type="file"
  onChange={e => handleImageUpload(key, e.target.files[0])}
/>
          <span>{images[key]?.name || "Keine Datei gewählt"}</span>
        </label>
      ))}
    </section>
  );

  const renderRemarks = () => {
    return (
      <section className="card">
        <h2>Bemerkungen</h2>
        <textarea
          rows={4}
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
        />
      </section>
    );
  };

  const renderTechnician = () => (
    <section className="card">
      <h2>Techniker</h2>
  
      <select
        value={technician}
        onChange={e => setTechnician(e.target.value)}
      >
        <option value="">Bitte wählen</option>
  
        <option value="Marcel Schindler">Marcel Schindler</option>
        <option value="Alin Costin">Alin Costin</option>
        <option value="Tamara Bühler">Tamara Bühler</option>
      </select>
    </section>
  );

  const renderSignatures = () => {
    return (
      <section className="card">
        <h2>Techniker-Unterschrift</h2>
  
        <SignatureCanvas
          ref={technicianSignatureRef}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 150,
            style: {
              border: "1px solid #ccc",
              background: "white"
            }
          }}
        />
  
        <button
          type="button"
          onClick={() => technicianSignatureRef.current?.clear()}
        >
          Löschen
        </button>
      </section>
    );
  };
  return (
    <div className="page">

      <header className="header">
        <h1>{category.title}</h1>
        <p>{category.description}</p>
      </header>

      <Link to="/" className="button button--secondary">
        ← Zurück zum Menü
      </Link>

      {renderMetaFields()}
      {renderSections()}
      {renderRemarks()}
      {renderTechnician()}
      {renderSignatures()}
      {renderImages()}

      <section className="card card--actions">
        <button className="button button--primary" onClick={handleSubmit}>
          Checkliste abschließen
        </button>
      </section>

    </div>
  );
}
