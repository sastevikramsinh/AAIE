import { Router } from "express";
import { getPublicStats } from "../controllers/statsController.js";

const router = Router();

router.get("/stats", getPublicStats);

export default router;

