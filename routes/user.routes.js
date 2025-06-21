import express from "express"
import { registerUser,verifyUser,userLogin,getUser, logout, forgetPassword, resetPassword } from "../controller/user.controller.js"
import { isLoggedIn } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register",registerUser)
router.get("/verify/:token",verifyUser)
router.post("/login", userLogin)
router.get("/getUser", isLoggedIn, getUser)
router.get("/logout", isLoggedIn, logout)
router.post("/forgetPassword", isLoggedIn, forgetPassword)

export default router 