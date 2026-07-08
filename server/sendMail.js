import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    try {
      const data = JSON.parse(req.body.data);
      const internnummer =  meta?.internnummer || "unknown";
      const ext = path.extname(file.originalname);

      cb(null, `${file.fieldname}_${internnummer}${ext}`);
    } catch {
      cb(null, file.originalname);
    }
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.post("/sendMail", upload.any(), async (req, res) => {
  try {
    console.log("✅ SERVER LÄUFT (PDF MODE)");

    const data = JSON.parse(req.body.data);
    const {
      meta,
      sections,
      remarks,
      technician,
      signatures
    } = data;
    
    // ✅ Dateiname
    const internnummer = meta?.internnummer || "unknown";
    const date = new Date().toISOString().slice(0, 10);

    
const pdfPath =`uploads/checkliste_${geraetenummer}_${internnummer}_${date}.pdf`;


    // ✅ PDF erstellen
    const doc = new PDFDocument();

    const stream = fs.createWriteStream(pdfPath);

    // ✅ WICHTIG: Fehler handling am Stream
    stream.on("error", (err) => {
      console.error("❌ PDF Stream Fehler:", err);
    });

    doc.pipe(stream);

    // --- PDF Inhalt ---
    doc.fontSize(18).text("Geräteaufnahme", { underline: true });
    doc.moveDown();

    doc.fontSize(14).text("Gerätedaten");
    Object.entries(meta || {}).forEach(([k, v]) => {
      doc.fontSize(12).text(`${k}: ${v}`);
    });

    doc.moveDown();

    doc.fontSize(14).text("Prüfungen");

sections.forEach(section => {
  doc.moveDown();
  doc.fontSize(12).text(section.title, {
    underline: true
  });

  section.items.forEach(item => {
    let statusText = "Nicht geprüft";

    if (item.status === "ok") {
      statusText = "OK";
    }

    if (item.status === "fehler") {
      statusText = "Fehler";
    }

    doc.text(
      `${item.label} | ${statusText} | ${item.value || ""}`
    );
  });
});

doc.moveDown();

doc.fontSize(14).text("Bemerkungen");
doc.fontSize(12).text(remarks || "");

doc.moveDown();

doc.fontSize(14).text("Techniker");
doc.fontSize(12).text(technician || "");

doc.moveDown();

doc.fontSize(14).text("Techniker-Unterschrift");

if (signatures?.techniker) {
  try {
    const base64Data = signatures.techniker.replace(
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
    console.log(
      "Unterschrift konnte nicht eingefügt werden"
    );
    console.error(err);
  }
}
    // ✅ Bilder
    if (req.files?.length) {
      doc.addPage().fontSize(14).text("Bilder");

      req.files.forEach(file => {
        try {
          doc.addPage();
          doc.image(file.path, { fit: [400, 300], align: "center" });
          doc.moveDown().text(file.filename);
        } catch (err) {
          console.log("⚠️ Bild konnte nicht geladen werden:", file.filename);
        }
      });
    }

    doc.end();

    // ✅ WARTEN BIS PDF FERTIG IST (KORREKT)
    await new Promise((resolve, reject) => {
      stream.on("finish", resolve);
      stream.on("error", reject);
    });

    console.log("✅ PDF fertig erstellt");

    // ✅ MAIL TRANSPORTER
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("📧 Sende Mail...");

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      subject: "Geräteaufnahme (PDF)",
      text: "Die Checkliste befindet sich im Anhang.",
      attachments: [
        {
          filename: path.basename(pdfPath),
          path: pdfPath
        }
      ]
    });

    console.log("✅ Mail gesendet");

    res.json({ success: true });

  } catch (err) {
    console.error("🔥 FEHLER:", err);
    res.status(500).json({ error: "Mailversand fehlgeschlagen" });
  }
});

app.listen(3001, () => {
  console.log("✅ Mailserver läuft auf Port 3001, 1A");
});