import express from "express";
const router = express.Router();

import { verifyToken } from "../middleware/jwt.js";
import {
  createReview,
  getReview,
  deleteReview,
} from "../controllers/review.controller.js";

router.post("/:id", verifyToken, createReview )
router.get("/:id", verifyToken, getReview )
router.delete("/:id",verifyToken, deleteReview)

export default router;

