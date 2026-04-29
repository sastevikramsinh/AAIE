import nodemailer from "nodemailer";
import { logError } from "../utils/logger.js";

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.ZOHO_SMTP_HOST || "smtp.zoho.in";
  const port = Number(process.env.ZOHO_SMTP_PORT || 465);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) return null;

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

export async function sendEmail({ to, subject, html }) {
  const mailer = getTransporter();
  if (!mailer) {
    return { skipped: true, reason: "Email credentials are not configured." };
  }

  try {
    const info = await mailer.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    return { skipped: false, messageId: info.messageId };
  } catch (error) {
    logError("Email send failed", error, { to, subject });
    throw error;
  }
}

