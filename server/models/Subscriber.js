import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    source: {
      type: String,
      enum: ["hero", "footer", "cta"],
      default: "hero",
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    unsubscribed: {
      type: Boolean,
      default: false,
    },
    preferences: {
      language: { type: String, default: "mr" },
      topics: { type: [String], default: [] },
    },
  },
  { timestamps: true },
);

export const Subscriber = mongoose.model("Subscriber", SubscriberSchema);

