import express from "express";
const router = express.Router();

import {
    CreatePropostion,
    getMyPropositions,
    getPropo,
} from '../controllers/proposition.controller.js'
import { verifyToken } from '../middleware/jwt.js';
import { isEnterprise } from '../middleware/isEnterprise.js'

router.post("/propose/:id", verifyToken, isEnterprise, CreatePropostion);
router.get("/proposition/all/:id", verifyToken, getMyPropositions);
router.get("/propositon/:id",verifyToken, getPropo)

export default router;