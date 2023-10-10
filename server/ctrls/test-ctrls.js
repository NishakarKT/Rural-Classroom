import mongoose from "mongoose";
import { Test } from "../models.js";

export const get_test = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // get tests
      const query = req.query;
      // check if _id is present and convert it to ObjectId
      if (query._id) query._id = new mongoose.Types.ObjectId(query._id);
      const tests = await Test.find(query);
      res.status(200).send({ data: tests, message: "tests found" });
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};

export const new_test = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      const data = req.body;
      const result = await new Test(data).save({ new: true });
      // check if test created
      if (!result) {
        res.status(403);
        throw new Error("test not created");
      } else {
        res.status(201).send({ test: result, message: "test created" });
      }
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};

export const edit_test = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // update test
      const { edits, query } = req.body;
      if (query) {
        // check if _id is present and convert it to ObjectId
        if (query._id) query._id = new mongoose.Types.ObjectId(query._id);
        const result = await Test.updateMany(query, { $set: edits }, { new: true });
        // check if test updated
        if (!result) {
          res.status(404);
          throw new Error("tests not found");
        } else {
          res.status(201).send({ tests: result, message: "tests updated" });
        }
      } else {
        res.status(404);
        throw new Error("tests not found");
      }
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};

export const delete_test = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // delete tests
      const { query } = req.body;
      if (query) {
        // check if _id is present and convert it to ObjectId
        if (query._id) query._id = new mongoose.Types.ObjectId(query._id);
        const result = await Test.deleteMany(query);
        // check if tests deleted
        if (!result) {
          res.status(404);
          throw new Error("tests not found");
        } else {
          res.status(202).send({ tests: result, message: "tests deleted" });
        }
      } else {
        res.status(404);
        throw new Error("tests not found");
      }
    }
  } catch (err) {
    if (res.statusCode < 400) res.status(500);
    res.send({ message: err.message || "something went wrong" });
  }
};
