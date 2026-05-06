import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";

import { connectMongo } from "./config/db.js";
import apiRouter from "./routes/index.js";
import { notFound } from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import { generalApiLimiter } from "./middleware/rateLimiters.js";
import { sanitizeBody } from "./utils/sanitize.js";

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const defaultOrigin = "http://localhost:5173";
if (!allowedOrigins.includes(defaultOrigin)) allowedOrigins.push(defaultOrigin);

app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(generalApiLimiter);
app.use(sanitizeBody);

app.get("/", (req, res) => {
  res.json({ message: "AAIE API is running" });
});

app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);

async function start() {
  if (process.env.MONGODB_URI) {
    // Start API immediately; connect DB in background so non-DB routes still work.
    connectMongo().catch((err) => {
      console.error("MongoDB unavailable; continuing without DB:", err?.message || err);
    });
  } else {
    console.warn("MONGODB_URI is not set; starting server without DB.");
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start();

// Graceful shutdown (useful in Render/containers)
function shutdown(signal) {
  console.log(`Received ${signal}. Closing server...`);
  mongoose.connection.close(() => process.exit(0));
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

