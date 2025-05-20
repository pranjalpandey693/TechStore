import express from "express"
import { addToCart,removeFromCart,checkoutCart,getCart,clearCart,updateCart } from "../controllers"
import { authenticate } from "../middleware"

const router = express.Router()

router.get("/:userId",authenticate,getCart)
router.post("/add",authenticate,addToCart)
router.delete("/remove/:productId",authenticate,removeFromCart)
router.post("/checkout",authenticate,checkoutCart)


export default router