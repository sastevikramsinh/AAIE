import mongoose from "mongoose";

const AppStatSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    value: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const AppStat = mongoose.model("AppStat", AppStatSchema);

