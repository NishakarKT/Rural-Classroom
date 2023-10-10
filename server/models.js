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
    courses: [{ type: String, required: true, default: [] }], // course _ids
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    teacher: { type: String, required: true }, // teacher's _id
    coordinators: [{ type: String }], // coordinator _ids
    calendar: { type: String, required: true }, // calendar _id
  },
  { timestamps: true }
);

const testSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    course: { type: String, required: true }, // course _id
    questions: [
      {
        question: { type: String, required: true },
        options: [
          {
            key: { type: String, required: true }, // A, 1, a, i, etc.
            value: { type: String, required: true }, // option text
          },
        ],
        answer: { type: String, required: true }, // key value of correct option
        responses: [
          {
            id: { type: String, required: true }, // coordinator _id + "_" + roll number
            response: { type: String, required: true }, // key value of option
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const Otp = new mongoose.model("otp", otpSchema);
export const User = new mongoose.model("user", userSchema);
export const Course = new mongoose.model("course", courseSchema);
export const Test = new mongoose.model("test", testSchema);
