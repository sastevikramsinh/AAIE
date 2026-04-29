import { body } from "express-validator";
import { Contact } from "../models/Contact.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmail } from "../services/emailService.js";
import {
  getContactAutoReplyTemplate,
  getContactFounderTemplate,
} from "../services/emailTemplates.js";

export const contactValidation = [
  body("name").isString().trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("message").isString().trim().notEmpty().withMessage("Message is required"),
  body("phone").optional().isString().trim(),
  body("subject").optional().isString().trim(),
  body("occupation")
    .optional()
    .isIn(["student", "teacher", "parent", "other"])
    .withMessage("Invalid occupation value"),
];

export const createContact = asyncHandler(async (req, res) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone || "",
    subject: req.body.subject || "",
    message: req.body.message,
    occupation: req.body.occupation || "other",
  };

  const inquiry = await Contact.create(payload);

  const founderTemplate = getContactFounderTemplate(payload);
  const founderEmail = process.env.FOUNDER_EMAIL || "founder@aaie.org.in";
  await sendEmail({
    to: founderEmail,
    subject: founderTemplate.subject,
    html: founderTemplate.html,
  });

  const autoReply = getContactAutoReplyTemplate({ name: inquiry.name });
  await sendEmail({ to: inquiry.email, subject: autoReply.subject, html: autoReply.html });

  return res.status(201).json({
    message: "Contact request submitted successfully.",
    data: { id: inquiry._id, status: inquiry.status, createdAt: inquiry.createdAt },
  });
});

