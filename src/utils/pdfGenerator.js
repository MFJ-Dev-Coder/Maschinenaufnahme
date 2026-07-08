import { jsPDF } from 'jspdf';

function addWrappedText(doc, text, x, y, maxWidth, lineHeight = 6) {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function generateChecklistPdf({
  categoryTitle,
  checkboxItems,
  textFieldItems,
  imageFiles,
}) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Geräteaufnahme', margin, y);
  y += 10;

  doc.setFontSize(14);
  doc.text(categoryTitle, margin, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Erstellt am: ${new Date().toLocaleString('de-DE')}`, margin, y);
  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Checkliste', margin, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);

  checkboxItems.forEach(({ label, checked }) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.text(`${checked ? '[x]' : '[ ]'} ${label}`, margin, y);
    y += 7;
  });

  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.text('Erfasste Daten', margin, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  textFieldItems.forEach(({ label, value }) => {
    if (y > 265) {
      doc.addPage();
      y = 20;
    }

    const line = `${label}: ${value || '—'}`;
    y = addWrappedText(doc, line, margin, y, contentWidth);
    y += 2;
  });

  if (imageFiles.length > 0) {
    y += 6;

    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.text('Bilder', margin, y);
    y += 8;
    doc.setFont('helvetica', 'normal');

    for (let index = 0; index < imageFiles.length; index += 1) {
      const file = imageFiles[index];
      const dataUrl = await readFileAsDataUrl(file);

      if (y > 200) {
        doc.addPage();
        y = 20;
      }

      doc.text(`Bild ${index + 1}: ${file.name}`, margin, y);
      y += 5;

      const imageWidth = 80;
      const imageHeight = 55;

      try {
        doc.addImage(dataUrl, 'JPEG', margin, y, imageWidth, imageHeight);
      } catch {
        doc.addImage(dataUrl, 'PNG', margin, y, imageWidth, imageHeight);
      }

      y += imageHeight + 10;
    }
  }

  return doc.output('blob');
}

export async function generateChecklistPdfBase64(payload) {
  const blob = await generateChecklistPdf(payload);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      resolve(dataUrl.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
