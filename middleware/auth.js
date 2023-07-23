/*const jwt = require("jsonwebtoken");
const User = require("../models/user");
*/
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const Auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication required" });
    console.error(error);
  }
};
export { Auth };
//export const Auth = auth();
//module.exports = Auth;
