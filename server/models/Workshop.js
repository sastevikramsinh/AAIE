import mongoose from "mongoose";

const WorkshopSchema = new mongoose.Schema(
  {
    title: {
      mr: { type: String, required: true, trim: true },
      en: { type: String, required: true, trim: true },
    },
    description: {
      mr: { type: String, required: true, trim: true },
      en: { type: String, required: true, trim: true },
    },
    date: { type: Date, required: true },
    duration: { type: Number, required: true, min: 1 },
    type: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: true,
    },
    location: { type: String, trim: true, default: "" },
    meetingLink: { type: String, trim: true, default: "" },
    capacity: { type: Number, required: true, min: 1 },
    registered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registration",
      },
    ],
    isFree: { type: Boolean, default: true },
    fee: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: ["upcoming", "live", "completed"],
      default: "upcoming",
    },
  },
  { timestamps: true },
);

export const Workshop = mongoose.model("Workshop", WorkshopSchema);

