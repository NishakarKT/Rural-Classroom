import { User } from "../models.js";
import { verifyJWT } from "../services/misc-services.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization) {
      // fetch token
      const token = authorization.split(" ")[1];
      // verify token
      const decoded = verifyJWT(token);
      if (!decoded) {
        res.status(401);
        throw new Error("invalid/expired token");
      } else {
        // check if user exists
        const user = await User.findOne({ email: decoded.email });
        if (user) {
          // set user
          req.user = user;
          next();
        } else {
          res.status(404);
          throw new Error("not found");
        }
      }
    } else {
      res.status(401);
      throw new Error("unauthorized");
    }
  } catch (err) {
    res.send({ message: err.message || "unauthorized" });
  }
};
