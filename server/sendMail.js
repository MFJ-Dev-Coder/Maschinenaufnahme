import express from "express";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

console.log("SUPABASE_URL =", process.env.SUPABASE_URL);
console.log(
  "SUPABASE_ANON_KEY vorhanden =",
  !!process.env.SUPABASE_ANON_KEY
);

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);


const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    try {
      const data = JSON.parse(req.body.data);

      const internnummer =
        data?.meta?.internnummer || "unknown";

      cb(
  null,
  `${file.fieldname}_${internnummer}`
);
    } catch {
      cb(null, file.originalname);
    }
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.get("/api/health", (req, res) => {
  console.log(
  `❤️ KEEP ALIVE PING ${new Date().toISOString()}`
);

  res.status(200).send("OK");
});

app.use(
  express.static(
    path.join(__dirname, "../dist")
  )
);

app.post("/sendMail", upload.any(), async (req, res) => {
  try {
    console.log("✅ SERVER LÄUFT (RESEND MODE)");

    const data = JSON.parse(req.body.data);

    const {
      meta,
      sections,
      remarks,
      technician,
      signatures
    } = data;

    const internnummer =
      meta?.internnummer || "unknown";

    const date = new Date()
      .toISOString()
      .slice(0, 10);

    const pdfPath =
      `uploads/checkliste_${internnummer}_${date}.pdf`;

    const doc = new PDFDocument({
  margin: 40
});

    const stream = fs.createWriteStream(pdfPath);

    stream.on("error", (err) => {
      console.error(
        "❌ PDF Stream Fehler:",
        err
      );
    });

    doc.pipe(stream);

   // =================================
// DECKBLATT
// =================================
const logoPath = path.join(
  __dirname,
  "../public/Pieckert Logo.png"
);
    
if (fs.existsSync(logoPath)) {
  doc.image(
    logoPath,
    140,
    30,
    { width: 280 }
  );
}
doc.y = 170;

doc
  .fontSize(24)
  .font("Helvetica-Bold")
  .text(
    "GERÄTEAUFNAHME",
    {
      align: "center"
    }
  );

doc.moveDown();

doc
  .fontSize(14)
  .font("Helvetica")
  .text(
    "Prüf- und Servicebericht",
    {
      align: "center"
    }
  );

doc.moveDown(3);

doc
  .fontSize(12)
  .font("Helvetica")
  .text(
    `Kunde: ${meta.kunde || ""}`,
    {
      align: "center"
    }
  );

doc.text(
  `Hersteller: ${meta.hersteller || ""}`,
  {
    align: "center"
  }
);

doc.text(
  `Typ: ${meta.typ || ""}`,
  {
    align: "center"
  }
);

doc.text(
  `Seriennummer: ${meta.seriennummer || ""}`,
  {
    align: "center"
  }
);

doc.moveDown();

doc
  .font("Helvetica-Bold")
  .text(
    `Internnummer: ${internnummer}`,
    {
      align: "center"
    }
  );

doc.moveDown(2);

doc
  .font("Helvetica")
  .text(
    `Techniker: ${technician || ""}`,
    {
      align: "center"
    }
  );

doc.text(
  `Datum: ${new Date().toLocaleDateString("de-DE")}`,
  {
    align: "center"
  }
);

doc.addPage();

// =================================
// GERÄTEDATEN
// =================================

doc
  .fontSize(16)
  .text("Gerätedaten", {
    underline: true
  });

doc.moveDown();

let y = doc.y;

Object.entries(meta || {}).forEach(
  ([k, v]) => {

    const label =
      k.charAt(0).toUpperCase() +
      k.slice(1);

    doc.rect(40, y, 180, 25).stroke();
    doc.rect(220, y, 300, 25).stroke();

    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(label, 50, y + 7);

    doc
      .font("Helvetica")
      .text(v || "", 230, y + 7);

    y += 25;
  }
);

doc.y = y + 20;

doc.moveDown();

    // Prüfungen
    doc.fontSize(14).text("Prüfungen");

    sections.forEach((section) => {
  doc.moveDown();

 doc
  .moveDown()
  .font("Helvetica-Bold")
  .fontSize(13)
  .fillColor("#e3000f")
  .text(section.title);

doc
  .moveTo(40, doc.y)
  .lineTo(550, doc.y)
  .stroke();

doc.fillColor("black");

doc.moveDown(0.5);

doc.fillColor("black");

doc.moveDown(0.3);

  section.items.forEach((item) => {

  let statusText = "Nicht geprüft";

  if (item.status === "ok") {
    statusText = "OK";
  }

  if (item.status === "Nicht vorhanden") {
    statusText = "Nicht vorhanden";
  }

  doc
    .font("Helvetica")
    .fontSize(10)
    .text(
      item.label,
      50,
      doc.y,
      {
        width: 300
      }
    );

  doc
    .font("Helvetica-Bold")
    .text(
      statusText,
      380,
      doc.y - 12
    );

  if (item.values) {

    doc.moveDown(0.2);

    Object.entries(item.values)
      .forEach(([k, v]) => {

        doc
          .fontSize(9)
          .fillColor("#555555")
          .text(
                `${k}: ${v}`,
                          150,
                        doc.y
                        );
      });

    doc.fillColor("black");
  }

  doc.moveDown(0.2);

});
});
    // Bemerkungen
    doc.moveDown();
    doc.fontSize(14).text("Bemerkungen");
    doc.fontSize(12).text(remarks || "");

    // Techniker
    doc.moveDown();
doc
  .fontSize(14)
  .text("Techniker");

doc
  .fontSize(12)
  .font("Helvetica-Bold")
  .text(technician || "");

doc.font("Helvetica");

    // Unterschrift
    doc.moveDown();
    doc.fontSize(14).text(
      "Techniker-Unterschrift"
    );

    if (signatures?.techniker) {
      try {
        const base64Data =
          signatures.techniker.replace(
            /^data:image\/png;base64,/,
            ""
          );

        const imageBuffer = Buffer.from(
          base64Data,
          "base64"
        );

        doc.image(imageBuffer, {
          fit: [250, 120]
        });
      } catch (err) {
        console.error(
          "Unterschrift konnte nicht eingefügt werden",
          err
        );
      }
    }

    // Bilder
    if (req.files?.length) {

  doc.addPage();

  doc
    .fontSize(16)
    .text("Bildanhang", {
      underline: true
    });

  doc.moveDown();

  let positions = [
    { x: 40, y: 90 },
    { x: 300, y: 90 },
    { x: 40, y: 330 },
    { x: 300, y: 330 }
  ];

  req.files.forEach((file, index) => {

    const pos = positions[index % 4];

    try {

doc.rect(
  pos.x - 5,
  pos.y - 5,
  230,
  185
).stroke();

console.log("file.path =", file.path);
console.log("file =", file);
console.log(
  "Datei existiert:",
  fs.existsSync(file.path)
);
      
doc.image(file.path, pos.x, pos.y, {
  fit: [220, 160],
  align: "center"
});

      
      const imageTitle = file.filename
        .replace(`_${internnummer}`, "")
        .replace(/_/g, " ");

      doc.text(
        imageTitle,
        pos.x,
        pos.y + 180,
        {
          width: 220,
          align: "center"
        }
      );

    } catch (err) {
      console.log(
        "⚠️ Bild konnte nicht geladen werden:",
        file.filename
      );
    }

    if (
      (index + 1) % 4 === 0 &&
      index < req.files.length - 1
    ) {
      doc.addPage();

      doc
        .fontSize(16)
        .text("Bildanhang", {
          underline: true
        });

      doc.moveDown();
    }

  });

}
    doc.end();

    await new Promise((resolve, reject) => {
      stream.on("finish", resolve);
      stream.on("error", reject);
    });

    console.log("✅ PDF fertig erstellt");

const { error } = await supabase
  .from("aufnahmen")
  .insert({
    internnummer,
    kunde: meta.kunde,
    hersteller: meta.hersteller,
    typ: meta.typ,
    seriennummer: meta.seriennummer,
    techniker,
    bemerkungen: remarks,
    pdf_name: path.basename(pdfPath)
  });

if (error) {
  console.error(
    "❌ Supabase Fehler:",
    error
  );
}

    const pdfBuffer =
      fs.readFileSync(pdfPath);

    console.log(
      "📧 Sende Mail über Resend..."
    );

    const result =
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.MAIL_TO,

        subject: `Geräteaufnahme ${internnummer}`,

        text: "Die Checkliste befindet sich im Anhang.",

        attachments: [
          {
            filename:
              path.basename(pdfPath),
            content:
              pdfBuffer.toString(
                "base64"
              )
          }
        ]
      });

    console.log("✅ Mail gesendet");
    console.log(result);

    res.json({
      success: true
    });

  } catch (err) {
    console.error("🔥 FEHLER:", err);

    res.status(500).json({
      error: "Mailversand fehlgeschlagen"
    });
  }
  });

const PORT = process.env.PORT || 3001;

app.use((req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../dist",
      "index.html"
    )
  );
});

app.listen(PORT, () => {
  console.log(
    `✅ Mailserver läuft auf Port ${PORT}`
  );
});
