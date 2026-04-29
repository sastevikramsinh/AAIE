import mongoose from "mongoose";
import { body, query } from "express-validator";
import { Workshop } from "../models/Workshop.js";
import { Registration } from "../models/Registration.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { sendEmail } from "../services/emailService.js";
import { getWorkshopConfirmationTemplate } from "../services/emailTemplates.js";
import { clearCache } from "../utils/cache.js";

export const workshopRegistrationValidation = [
  body("name").isString().trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("phone").isString().trim().notEmpty().withMessage("Phone is required"),
  body("occupation").optional().isString().trim(),
  body("workshopId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Workshop ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid workshop ID"),
];

export const workshopsListValidation = [
  query("type").optional().isIn(["online", "offline", "hybrid"]),
  query("dateFrom").optional().isISO8601(),
  query("dateTo").optional().isISO8601(),
];

export const registerWorkshop = asyncHandler(async (req, res) => {
  const { name, email, phone, occupation = "other", workshopId } = req.body;

  const workshop = await Workshop.findById(workshopId);
  if (!workshop || workshop.status === "completed") {
    throw new ApiError(404, "Workshop not found or no longer open for registration.");
  }

  if (workshop.registered.length >= workshop.capacity) {
    throw new ApiError(409, "Workshop is full.");
  }

  const existingRegistration = await Registration.findOne({
    workshop: workshop._id,
    email,
  }).lean();

  if (existingRegistration) {
    throw new ApiError(409, "You are already registered for this workshop.");
  }

  const registration = await Registration.create({
    workshop: workshop._id,
    name,
    email,
    phone,
    occupation,
    workshopId,
  });

  workshop.registered.push(registration._id);
  await workshop.save();

  const confirmation = getWorkshopConfirmationTemplate({
    name,
    workshopTitleMr: workshop.title.mr,
    workshopTitleEn: workshop.title.en,
    date: workshop.date,
  });

  await sendEmail({ to: email, subject: confirmation.subject, html: confirmation.html });
  clearCache("public-stats");

  return res.status(201).json({
    message: "Workshop registration successful.",
    data: {
      id: registration._id,
      workshop: {
        id: workshop._id,
        title: workshop.title,
        date: workshop.date,
      },
    },
  });
});

export const getWorkshops = asyncHandler(async (req, res) => {
  const { type, dateFrom, dateTo } = req.query;
  const filter = { status: { $in: ["upcoming", "live"] } };

  if (type) filter.type = type;
  if (dateFrom || dateTo) {
    filter.date = {};
    if (dateFrom) filter.date.$gte = new Date(dateFrom);
    if (dateTo) filter.date.$lte = new Date(dateTo);
  }

  const workshops = await Workshop.find(filter).sort({ date: 1 }).lean();

  const publicWorkshops = workshops.map((w) => ({
    id: w._id,
    title: w.title,
    description: w.description,
    date: w.date,
    duration: w.duration,
    type: w.type,
    location: w.location,
    capacity: w.capacity,
    seatsLeft: Math.max(0, w.capacity - (w.registered?.length || 0)),
    isFree: w.isFree,
    fee: w.fee,
    status: w.status,
  }));

  return res.status(200).json({ data: publicWorkshops });
});

