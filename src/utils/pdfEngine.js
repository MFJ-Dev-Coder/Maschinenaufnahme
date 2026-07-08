import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generateChecklistPDF(payload) {
  const {
    meta,
    sections,
    decisions,
    remarks,
    signatures
  } = payload;

  // 1. PDF Vorlage laden
  const templateBytes = await fetch("/templates/Pruefliste_Flurfoerderfahrzeuge.pdf").then(res =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(templateBytes);
  const page = pdfDoc.getPages()[0];
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Hilfsfunktion zum Schreiben
  const write = (text, x, y, size = 10) => {
    page.drawText(text || "", {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0)
    });
  };

  // ---------------------------------------------------
  // 2. Meta-Felder in PDF setzen
  // ---------------------------------------------------
  write(meta.kunde, 90, 760);
  write(meta.hersteller, 90, 740);
  write(meta.typ, 90, 720);
  write(meta.auftragsnummer, 120, 300);
  write(meta.seriennummer, 120, 280);
  write(meta.baujahr, 120, 260);
  write(meta.betriebsstunden, 350, 260);

  // ---------------------------------------------------
  // 3. Prüfpositionen (OK / Fehler / Rep)
  // ---------------------------------------------------
  const statusToSymbol = {
    ok: "✔",
    fehler: "✘",
    rep: "R"
  };

  let startY = 680;

  sections.forEach(section => {
    section.items.forEach(item => {
      const symbol = statusToSymbol[item.status] || "";

      // OK / Fehler / Rep Spalten
      write(symbol === "✔" ? "✔" : "", 300, startY);
      write(symbol === "✘" ? "✘" : "", 330, startY);
      write(symbol === "R" ? "R" : "", 360, startY);

      startY -= 18;
    });

    startY -= 10; // Abstand zwischen Kapiteln
  });

  // ---------------------------------------------------
  // 4. Kundenentscheidungen
  // ---------------------------------------------------
  if (decisions.keine_reparatur) write("X", 450, 150);
  if (decisions.reparatur) write("X", 450, 130);
  if (decisions.kv) write("X", 450, 110);

  // ---------------------------------------------------
  // 5. Bemerkungen
  // ---------------------------------------------------
  write(remarks, 120, 90);

  // ---------------------------------------------------
  // 6. Unterschriften
  // ---------------------------------------------------
  write(signatures.monteur, 150, 60);
  write(signatures.kunde, 150, 40);

  // ---------------------------------------------------
  // 7. PDF zurückgeben
  // ---------------------------------------------------
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}
