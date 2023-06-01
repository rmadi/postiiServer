import { json } from "express";
import User from "../models/users.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {

  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    const user = await User.findOne({ email: req.body.email });
    if (user) return  res.json({error : "User already exist", status:0}).status(404)
    if (newUser.isEnterprise) {
      if (!newUser.IBN || !newUser.CNSS || !newUser.matricule) {
        return next(
          createError(400, "All fields are required for enterprises!")
        );
      }

      const existingUser = await User.findOne({
        $or: [
          { IBN: newUser.IBN },
          { CNSS: newUser.CNSS },
          { matricule: newUser.matricule },
        ],
      });

      if (existingUser) {
        res
          .json({
            error:
              "An enterprise with the same IBN, CNSS, or matricule already exists",
          })
          .status(409);
      }
    }

    await newUser.save();

    res.status(201).json({ status: 1, message: "User has been created." });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return res.json({error: 'password inccorect!'})

    const token = jwt.sign(
      {
        id: user._id,
        isEnterprise: user.isEnterprise,
      },
      process.env.JWT_KEY
    );

    let userInfo = user.toJSON();
    delete userInfo.password;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        // sameSite: 'none',
        // secure: true,
      })
      .status(200)
      .json({userInfo: userInfo, token: token});
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
