import { Router } from "express";
import { register,login, getme, logout,refreshToken, } from "../controllers";
import { authenticate } from "../middleware";

const router = Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/me",authenticate,getme)
router.post('/refresh',authenticate,refreshToken)

export default router