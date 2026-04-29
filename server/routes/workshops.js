import { Router } from "express";
import {
  getWorkshops,
  registerWorkshop,
  workshopRegistrationValidation,
  workshopsListValidation,
} from "../controllers/workshopController.js";
import { validateRequest } from "../middleware/validate.js";
import { workshopRegisterLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.get("/workshops", workshopsListValidation, validateRequest, getWorkshops);
router.post(
  "/workshop-register",
  workshopRegisterLimiter,
  workshopRegistrationValidation,
  validateRequest,
  registerWorkshop,
);

export default router;

