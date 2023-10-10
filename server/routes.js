import express from "express";
// middlewares
import { isAuthenticated } from "./middlewares/auth-middlewares.js";
// controllers
import * as miscCtrls from "./ctrls/misc-ctrls.js";
import * as authCtrls from "./ctrls/auth-ctrls.js";
import * as userCtrls from "./ctrls/user-ctrls.js";
import * as courseCtrls from "./ctrls/course-ctrls.js";

const Router = express.Router();

// misc rouets
Router.get("/", miscCtrls.index);
// Auth Routes
Router.post("/auth/token", authCtrls.token);
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

export default Router;
