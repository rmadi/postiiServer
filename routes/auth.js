import express from "express";
import { login, logout, registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", login)
router.post("/logout", logout)

export default router;

