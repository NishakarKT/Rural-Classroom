import express from "express";
// middlewares
import { isAuthenticated } from "./middlewares/auth-middlewares.js";
// controllers
import * as miscCtrls from "./ctrls/misc-ctrls.js";
import * as authCtrls from "./ctrls/auth-ctrls.js";
import * as userCtrls from "./ctrls/user-ctrls.js";
import * as courseCtrls from "./ctrls/course-ctrls.js";
import * as testCtrls from "./ctrls/test-ctrls.js";
import * as notificationCtrls from "./ctrls/notification-ctrls.js";

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

export default Router;
