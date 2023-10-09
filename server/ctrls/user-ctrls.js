import { User } from "../models.js";
import { verifyJWT } from "../services/misc-services.js";

export const get_user = async (req, res) => {
  try {
    // identify user
    const user = req.user;
    // check if user exists
    if (!user) {
      res.status(401);
      throw new Error("unauthorized");
    } else {
      res.status(200).send({ user, message: "user found" });
    }
  } catch (err) {
    res.send({ message: err.message || "something went wrong" });
  }
};

export const new_user = async (req, res) => {
  try {
    // identify user
    const token = req.token;
    const decoded = verifyJWT(token);
    console.log(decoded);
    if (!decoded) {
      res.status(401);
      throw new Error("invalid/expired token");
    } else {
      const email = decoded.email;
      // check if user exists
      const user = await User.findOne({ email });
      if (user) {
        res.status(403);
        throw new Error("user exists already");
      } else {
        // create user
        const { data } = req.body;
        const result = await User.create({ ...data, email }, { new: true });
        // check if user created
        if (!result) {
          res.status(404);
          throw new Error("user not created");
        } else {
          res.status(201).send({ user: result, message: "user created" });
        }
      }
    }
  } catch (err) {
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
      // update user
      const { edits } = req.body;
      const result = await User.findByIdAndUpdate(user._id, edits, { new: true });
      // check if user updated
      if (!result) {
        res.status(404);
        throw new Error("user not found");
      } else {
        res.status(201).send({ user: result, message: "user updated" });
      }
    }
  } catch (err) {
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
      const result = await User.findByIdAndDelete(user._id);
      // check if user deleted
      if (!result) {
        res.status(404);
        throw new Error("user not found");
      } else {
        res.status(202).send({ message: "user deleted" });
      }
    }
  } catch (err) {
    res.send({ message: err.message || "something went wrong" });
  }
};
