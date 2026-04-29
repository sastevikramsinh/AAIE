import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
    workshop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workshop",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: { type: String, required: true, trim: true },
    occupation: { type: String, trim: true, default: "other" },
    workshopId: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

RegistrationSchema.index({ workshop: 1, email: 1 }, { unique: true });

export const Registration = mongoose.model("Registration", RegistrationSchema);

