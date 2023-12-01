import mongoose from "mongoose";
import { Attendance } from "../models.js";

export const get_attendance = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // get attendances
      const query = JSON.parse(req.query.query) || {};
      // check if _id is present and convert it to ObjectId
      if (typeof query._id === "string") query._id = new mongoose.Types.ObjectId(query._id);
      else if (typeof query._id === "object") Object.keys(query._id).forEach((key) => (query._id[key] = query._id[key].map((_id) => new mongoose.Types.ObjectId(_id))));
      const attendances = await Attendance.find(query);
      res.status(200).send({ data: attendances, message: "attendances found" });
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};

export const new_attendance = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // create attendance
      const data = req.body;
      const result = await new Attendance(data).save({ new: true });
      // check if attendance created
      if (!result) {
        res.status(403);
        throw new Error("attendance not created");
      } else {
        res.status(201).send({ data: result, message: "attendance created" });
      }
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};

export const edit_attendance = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // update users
      const { query, edits } = req.body;
      if (query) {
        // check if _id is present and convert it to ObjectId
        if (query._id) query._id = new mongoose.Types.ObjectId(query._id);
        const result = await Attendance.updateMany(query, edits, { new: true });
        // check if attendance updated
        if (!result) {
          res.status(404);
          throw new Error("attendance not found");
        } else {
          res.status(201).send({ data: result, message: "attendance updated" });
        }
      } else {
        res.status(404);
        throw new Error("attendance not found");
      }
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};

export const delete_attendance = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // delete user
      const { query } = req.body;
      if (query) {
        // check if _id is present and convert it to ObjectId
        if (query._id) query._id = new mongoose.Types.ObjectId(query._id);
        const result = await Attendance.deleteMany(query);
        // check if attendance deleted
        if (!result) {
          res.status(404);
          throw new Error("attendance not found");
        } else {
          res.status(202).send({ data: result, message: "attendance deleted" });
        }
      } else {
        res.status(404);
        throw new Error("attendance not found");
      }
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};
