import User from "../models/users.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  
  await User.findByIdAndDelete(req.userId);  
  res.status(200).send("deleted.");
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.userId);

  res.status(200).send(user);
};

export const ModifyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    if(!user) next (error)

    Object.assign(user, req.body);
    await user.save();

    res.status(200).json(user);

  } catch (error) {
    next(error)
  }
}
