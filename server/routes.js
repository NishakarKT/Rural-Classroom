import express from "express";
// // middlewares
// import { isAuthenticated } from "./middlewares/auth-middlewares.js";
// controllers
import * as miscCtrls from "./ctrls/misc-ctrls.js";
import * as authCtrls from "./ctrls/auth-ctrls.js";

const Router = express.Router();

// misc rouets
Router.get("/", miscCtrls.index);
// Auth Routes
Router.post("/auth/login", authCtrls.login);
Router.post("/auth/token", authCtrls.token);
Router.post("/auth/otp-generate", authCtrls.otp_generate);
Router.post("/auth/otp-verify", authCtrls.otp_verify);

export default Router;
