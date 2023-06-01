import express from "express";
const router = express.Router();

import auth from './auth.js'
import offre from './offre.route.js'
import proposition from './proposition.route.js'
import conversation from './conversation.route.js'
import user from './user.route.js'
import Review from "./review.route.js"
// import message from './messages.route.js'

router.use("/api/auth", auth);
router.use("/api/offre", offre)
router.use("/api/propo", proposition)
router.use("/api/conversation",conversation)
router.use("/api/user", user)
router.use("/api/review/", Review);
// router.use('api/message',message)

export default router;

