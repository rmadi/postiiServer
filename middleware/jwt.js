import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  // if (!token) return next(createError(401,"You are not authenticated!"))

  if (!token) {
    res.json({
      error : "You are not authenticated!"
    }).status(401)
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.json({error: "Token is not valid!"})
    req.userId = payload.id;
    req.isEnterprise = payload.isEnterprise;
    next()
  });
};