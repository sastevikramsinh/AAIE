import mongoose from "mongoose";

export async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");

  const maxRetries = process.env.MONGODB_CONNECT_RETRIES
    ? Number(process.env.MONGODB_CONNECT_RETRIES)
    : 10;

  let attempt = 0;
  // Retry with exponential backoff to survive Atlas hiccups during startup.
  while (attempt <= maxRetries) {
    try {
      await mongoose.connect(uri, {
        // Mongoose 8 defaults are safe; these are here for clarity.
        serverSelectionTimeoutMS: 30000,
        dbName: process.env.MONGODB_DBNAME,
      });

      console.log("MongoDB connected");
      return;
    } catch (err) {
      attempt += 1;
      const delayMs = Math.min(30000, 1000 * 2 ** attempt);
      console.error(
        `MongoDB connection failed (attempt ${attempt}/${maxRetries}). Retrying in ${delayMs}ms...`,
      );

      if (attempt > maxRetries) throw err;

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

