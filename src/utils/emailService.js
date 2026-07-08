import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const RECIPIENT_EMAIL =
  import.meta.env.VITE_RECIPIENT_EMAIL || 'empfaenger@example.com';

function assertEmailJsConfig() {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      'EmailJS ist nicht konfiguriert. Bitte .env mit Service-ID, Template-ID und Public Key anlegen.',
    );
  }
}

export async function sendChecklistPdfByEmail({
  categoryTitle,
  pdfBase64,
  fileName,
  summaryText,
}) {
  assertEmailJsConfig();

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email: RECIPIENT_EMAIL,
      category: categoryTitle,
      message: summaryText,
      attachment: pdfBase64,
      file_name: fileName,
    },
    PUBLIC_KEY,
  );
}

export function getRecipientEmail() {
  return RECIPIENT_EMAIL;
}
