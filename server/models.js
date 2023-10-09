import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    email: { type: String, required: true },
    hashedOtp: { type: String, required: true },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    contact: { type: String },
    role: { type: String, default: "coordinator" },
  },
  { timestamps: true }
);

export const Otp = new mongoose.model("otp", otpSchema);
export const User = new mongoose.model("user", userSchema);
