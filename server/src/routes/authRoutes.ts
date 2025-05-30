import { Router } from "express";
import { register,login, getme } from "../controllers";
import { authenticate } from "../middleware";

const router = Router()

router.post("/register",register)
router.post("/login",login)
router.get("/me",authenticate,getme)

export default router