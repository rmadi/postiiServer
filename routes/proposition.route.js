import express from "express";
const router = express.Router();

import {
    createPropostion,
    getMyPropositions,
    getPropo,
} from '../controllers/proposition.controller.js'
import { verifyToken } from '../middleware/jwt.js';
import { isEnterprise } from '../middleware/isEnterprise.js'

router.post("/:id",  createPropostion);
router.get("/proposition/all/:id", verifyToken, getMyPropositions);
router.get("/propositon/:id",verifyToken, getPropo)

export default router;