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
    profilePic: { type: String }, // path to file
    coverPic: { type: String }, // path to file
    courses: [{ type: String, required: true, default: [] }], // course _ids
  },
  { timestamps: true }
);

const studentSchema = new mongoose.Schema(
  {
    name: { type: String },
    roll: { type: String, required: true, unique: true },
    contact: { type: String },
    profiePic: { type: String }, // path to file
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    teacher: { type: String, required: true }, // teacher's _id
    coordinators: [{ type: String, required: true }], // coordinator _ids
    lectures: [{ type: String, required: true }], // lecture _ids
    tests: [{ type: String, required: true }], // test _ids
    materials: [{ type: String, required: true }], // path to files
    picture: { type: String }, // path to file
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

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    sentTo: [{ type: String, required: true }], // user _id
    sentBy: { type: String, required: true }, // user _id
  },
  { timestamps: true }
);

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    path: { type: String, required: true },
    description: { type: String },
    course: { type: String, required: true }, // course _id
    thumbnail: { type: String }, // path to file
  },
  { timestamps: true }
);

const attendanceSchema = new mongoose.Schema(
  {
    lecture: { type: String, required: true }, // lecture _id
    present: [{ type: String, required: true }], // student _ids
  },
  { timestamps: true }
);

const calendarSchema = new mongoose.Schema(
  {
    course: { type: String, required: true }, // course _id
    schedule: [
      {
        date: { type: String, required: true }, // date-time ISO string
        duration: { type: Number, required: true }, // duration in minutes
      }
    ]
  },
  { timestamps: true }
);

const performanceSchema = new mongoose.Schema(
  {
    student: { type: String, required: true }, // student _id
    course: { type: String, required: true }, // course _id
    tests: [
      {
        test: { type: String, required: true }, // test _id
        score: { type: Number, required: true }, // score in percentage
      }
    ]
  },
  { timestamps: true }
);

export const Otp = new mongoose.model("otp", otpSchema);
export const User = new mongoose.model("user", userSchema);
export const Student = new mongoose.model("student", studentSchema);
export const Course = new mongoose.model("course", courseSchema);
export const Test = new mongoose.model("test", testSchema);
export const Notification = new mongoose.model("notification", notificationSchema);
export const Lecture = new mongoose.model("lecture", lectureSchema);
export const Attendance = new mongoose.model("attendance", attendanceSchema);
export const Calendar = new mongoose.model("calendar", calendarSchema);
export const Performance = new mongoose.model("performance", performanceSchema);
