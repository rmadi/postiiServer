import express from "express";
const router = express.Router();

import {
  createMessage,
  getMessages,
} from "../controllers/messages.controller.js";
import { verifyToken } from "../middleware/jwt.js";



router.post("/", verifyToken, createMessage);
router.get("/:id", verifyToken, getMessages);

export default router;

