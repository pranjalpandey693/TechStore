import express from "express"
import { addToCart,removeFromCart,checkoutCart,getCart,clearCart,updateCart } from "../controllers"
import { authenticate } from "../middleware"

const router = express.Router()

router.get("/",authenticate,getCart)
router.post("/add",authenticate,addToCart)
router.delete("/remove/:productId",authenticate,removeFromCart)
router.post("/checkout",authenticate,checkoutCart)
router.delete("/clear",authenticate,clearCart)
router.patch("/update/:productId",authenticate,updateCart)


export default router
