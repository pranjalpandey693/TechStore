import { Router } from "express";
import { register,login, getme, logout,refreshToken,verifyToken } from "../controllers";
import { authenticate } from "../middleware";

const router = Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/me",authenticate,getme)
router.get('/verify',authenticate,refreshToken)
router.post('/refresh',authenticate,verifyToken)

export default router