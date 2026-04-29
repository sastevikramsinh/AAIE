import { Router } from "express";
import {
  contactValidation,
  createContact,
} from "../controllers/contactController.js";
import { validateRequest } from "../middleware/validate.js";
import { contactLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.post("/contact", contactLimiter, contactValidation, validateRequest, createContact);

export default router;

