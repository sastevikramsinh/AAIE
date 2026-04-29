import { Router } from "express";
import {
  subscribe,
  subscribeValidation,
} from "../controllers/subscribeController.js";
import { validateRequest } from "../middleware/validate.js";
import { subscribeLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.post("/subscribe", subscribeLimiter, subscribeValidation, validateRequest, subscribe);

export default router;

