import express from "express";
import { deleteUser, getUser, ModifyProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.put("/",verifyToken, ModifyProfile)
router.delete("/del", verifyToken, deleteUser);
router.get("/",verifyToken, getUser);

export default router;
