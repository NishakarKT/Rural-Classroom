import express from "express";
// middlewares
import { isAuthenticated } from "./middlewares/auth-middlewares.js";
// controllers
import * as miscCtrls from "./ctrls/misc-ctrls.js";
import * as authCtrls from "./ctrls/auth-ctrls.js";
import * as userCtrls from "./ctrls/user-ctrls.js";
import * as studentCtrls from "./ctrls/student-ctrls.js";
import * as courseCtrls from "./ctrls/course-ctrls.js";
import * as testCtrls from "./ctrls/test-ctrls.js";
import * as notificationCtrls from "./ctrls/notification-ctrls.js";
import * as lectureCtrls from "./ctrls/lecture-ctrls.js";
import * as attendanceCtrls from "./ctrls/attendance-ctrls.js";
import * as calendarCtrls from "./ctrls/calendar-ctrls.js";
import * as performanceCtrls from "./ctrls/performance-ctrls.js";

const Router = express.Router();

// misc rouets
Router.get("/", miscCtrls.index);
// Auth Routes
Router.post("/auth/token", isAuthenticated, authCtrls.token);
Router.post("/auth/otp-generate", authCtrls.otp_generate);
Router.post("/auth/otp-verify", authCtrls.otp_verify);
// User Routes
Router.get("/user/get", isAuthenticated, userCtrls.get_user);
Router.post("/user/new", isAuthenticated, userCtrls.new_user);
Router.patch("/user/edit", isAuthenticated, userCtrls.edit_user);
Router.delete("/user/delete", isAuthenticated, userCtrls.delete_user);
// Student Routes
Router.get("/student/get", isAuthenticated, studentCtrls.get_student);
Router.post("/student/new", isAuthenticated, studentCtrls.new_student);
Router.patch("/student/edit", isAuthenticated, studentCtrls.edit_student);
Router.delete("/student/delete", isAuthenticated, studentCtrls.delete_student);
// Course Routes
Router.get("/course/get", isAuthenticated, courseCtrls.get_course);
Router.post("/course/new", isAuthenticated, courseCtrls.new_course);
Router.patch("/course/edit", isAuthenticated, courseCtrls.edit_course);
Router.delete("/course/delete", isAuthenticated, courseCtrls.delete_course);
// Test Routes
Router.get("/test/get", isAuthenticated, testCtrls.get_test);
Router.post("/test/new", isAuthenticated, testCtrls.new_test);
Router.patch("/test/edit", isAuthenticated, testCtrls.edit_test);
Router.delete("/test/delete", isAuthenticated, testCtrls.delete_test);
// Notification Routes
Router.get("/notification/get", isAuthenticated, notificationCtrls.get_notification);
Router.post("/notification/new", isAuthenticated, notificationCtrls.new_notification);
Router.patch("/notification/edit", isAuthenticated, notificationCtrls.edit_notification);
Router.delete("/notification/delete", isAuthenticated, notificationCtrls.delete_notification);
// Lecture Routes
Router.get("/lecture/get", isAuthenticated, lectureCtrls.get_lecture);
Router.post("/lecture/new", isAuthenticated, lectureCtrls.new_lecture);
Router.patch("/lecture/edit", isAuthenticated, lectureCtrls.edit_lecture);
Router.delete("/lecture/delete", isAuthenticated, lectureCtrls.delete_lecture);
// Attendance Routes
Router.get("/attendance/get", isAuthenticated, attendanceCtrls.get_attendance);
Router.post("/attendance/new", isAuthenticated, attendanceCtrls.new_attendance);
Router.patch("/attendance/edit", isAuthenticated, attendanceCtrls.edit_attendance);
Router.delete("/attendance/delete", isAuthenticated, attendanceCtrls.delete_attendance);
// Calendar Routes
Router.get("/calendar/get", isAuthenticated, calendarCtrls.get_calendar);
Router.post("/calendar/new", isAuthenticated, calendarCtrls.new_calendar);
Router.patch("/calendar/edit", isAuthenticated, calendarCtrls.edit_calendar);
Router.delete("/calendar/delete", isAuthenticated, calendarCtrls.delete_calendar);
// Performance Routes
Router.get("/performance/get", isAuthenticated, performanceCtrls.get_performance);
Router.post("/performance/new", isAuthenticated, performanceCtrls.new_performance);
Router.patch("/performance/edit", isAuthenticated, performanceCtrls.edit_performance);
Router.delete("/performance/delete", isAuthenticated, performanceCtrls.delete_performance);

export default Router;
