import express from "express";
import {
    createOffre,
    singleOffre,
    allOffre,
    deleteOffre,
    updateOffre,  
    myOffres,
} from '../controllers/offre.controller.js'
import { verifyToken } from '../middleware/jwt.js';
import { isEnterprise } from '../middleware/isEnterprise.js'

const router = express.Router();

router.post("/:id", createOffre);
router.delete("/:id", deleteOffre);
router.put("/:id",  updateOffre);
router.get("/single/:id",  singleOffre);
router.get("/",  allOffre);
router.get("/myoffre/:id",  myOffres)

export default router;
