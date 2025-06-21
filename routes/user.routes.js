import express from "express"
import { registerUser,verifyUser,userLogin } from "../controller/user.controller.js"

const router = express.Router()

router.post("/register",registerUser)
router.get("/verify/:token",verifyUser)
router.post("/login", userLogin)

export default router 