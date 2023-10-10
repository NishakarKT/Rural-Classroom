import { Course } from "../models.js";

export const get_course = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // get courses
      const { query } = req.body;
      const courses = await Course.find(query);
      res.status(200).send({ courses, message: "courses found" });
    }
  } catch (err) {
    if(res.statusCode < 400) res.status(500)
    res.send({ message: err.message || "something went wrong" });
  }
};

export const new_course = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      const data = req.body;
      console.log(data)
      const result = await new Course(data).save({ new: true});
      // check if course created
      if (!result) {
        res.status(403);
        throw new Error("course not created");
      } else {
        res.status(201).send({ course: result, message: "course created" });
      }
    }
  } catch (err) {
    if(res.statusCode < 400) res.status(500)
    res.send({ message: err.message || "something went wrong" });
  }
};

export const edit_course = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // update user
      const { edits, query } = req.body;
      const result = await Course.updateMany(query, { $set: edits }, { new: true });
      // check if user updated
      if (!result) {
        res.status(404);
        throw new Error("courses not found");
      } else {
        res.status(201).send({ courses: result, message: "courses updated" });
      }
    }
  } catch (err) {
    if(res.statusCode < 400) res.status(500)
    res.send({ message: err.message || "something went wrong" });
  }
};

export const delete_course = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      // delete courses
      const { query } = req.body;
      const result = await Course.deleteMany(query);
      // check if courses deleted
      if (!result) {
        res.status(404);
        throw new Error("courses not found");
      } else {
        res.status(202).send({ message: "courses deleted" });
      }
    }
  } catch (err) {
    if(res.statusCode < 400) res.status(500)
    res.send({ message: err.message || "something went wrong" });
  }
};
