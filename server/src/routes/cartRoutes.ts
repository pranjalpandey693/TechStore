import express from "express"
import { addToCart,removeFromCart,checkoutCart,getCart,clearCart,updateCart } from "../controllers"
import { authenticate } from "../middleware"

const router = express.Router()

router.post("/add",authenticate,addToCart)
router.delete("/remove/:productId",authenticate,removeFromCart)
router.post("/checkout",authenticate,checkoutCart)
router.get("/:userid",authenticate,getCart)


export default router