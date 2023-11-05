import mongoose from "mongoose";
import { User } from "../models.js";

export const get_user = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      const query = req.query;
      // check if _id is present and convert it to ObjectId
      if (query._id) query._id = new mongoose.Types.ObjectId(query._id);
      const users = await User.find(query);
      res.status(200).send({ data: users, message: "users found" });
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};

export const new_user = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // create user
      const data = req.body;
      const result = await new User(data).save({ new: true });
      // check if user created
      if (!result) {
        res.status(403);
        throw new Error("user not created");
      } else {
        res.status(201).send({ data: result, message: "user created" });
      }
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};

export const edit_user = async (req, res) => {
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
        const result = await User.updateMany(query, edits, { new: true });
        // check if user updated
        if (!result) {
          res.status(404);
          throw new Error("user not found");
        } else {
          res.status(201).send({ data: result, message: "user updated" });
        }
      } else {
        res.status(404);
        throw new Error("user not found");
      }
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};

export const delete_user = async (req, res) => {
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
        const result = await User.deleteMany(query);
        // check if user deleted
        if (!result) {
          res.status(404);
          throw new Error("user not found");
        } else {
          res.status(202).send({ data: result, message: "user deleted" });
        }
      } else {
        res.status(404);
        throw new Error("user not found");
      }
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};
