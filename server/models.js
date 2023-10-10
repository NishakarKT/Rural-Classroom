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
    email: { type: String, required: true, unique: true },
    contact: { type: String },
    role: { type: String, default: "coordinator" },
    courses: [{ type: String, required: true, default: [] }],
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    teacher: { type: String, required: true },
    coordinators: [{ type: String }],
  },
  { timestamps: true }
);

export const Otp = new mongoose.model("otp", otpSchema);
export const User = new mongoose.model("user", userSchema);
export const Course = new mongoose.model("course", courseSchema);
