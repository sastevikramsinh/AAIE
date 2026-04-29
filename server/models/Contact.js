import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: { type: String, trim: true, default: "" },
    subject: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
    occupation: {
      type: String,
      enum: ["student", "teacher", "parent", "other"],
      default: "other",
    },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Contact = mongoose.model("Contact", ContactSchema);

