import { Request,Response } from "express"
import { getCartFormRedis, saveCartRedis, syncCartToMongoDB } from "../utils"
import { CART_ITEM_STATUS, RedisCart,RedisCartItem } from "../interfaces"


export const getCart = async(req:Request,res:Response)=>{
    const {userId} = req.params
    try {
        const cart : RedisCart = await getCartFormRedis(userId)
        if(!cart){
            res.status(404).json({message: "Cart not found "})
            return
        }
        res.json(cart)
    } catch (error) {
        res.status(500).json({error: (error as Error).message })
    }
}


export const addToCart = async(req:Request,res:Response)=>{
    const {userId} = req.body
    const {product,quantity,price} = req.body

    try {
        let cart:RedisCart = await getCartFormRedis(userId) || {products:[]}

        const itemIndex = cart.products.findIndex((p:RedisCartItem)=> p.product === product)
        if(itemIndex>=0){
            cart.products[itemIndex].quantity += quantity
            cart.products[itemIndex].totalprice = cart.products[itemIndex].quantity * price
        } else {
            cart.products.push({
                product,
                quantity,
                price,
                totalprice : quantity*price,
                status: CART_ITEM_STATUS.Not_processed
            })
        }
        await saveCartRedis(userId,cart)
        res.json({message:"Product added to cart",cart})
        
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}

export const updateCart = async (req:Request,res:Response)=>{
     const {userId } = req.body
     const {productId} = req.params
     const {quantity} = req.body

     try {
        const cart : RedisCart = await getCartFormRedis(userId)
        if(!cart){
            return res.status(404).json({message: "Cart not found "})
        }

        const item = cart.products.find((p)=>p.product===productId)
        if(!item){
            return res.status(404).json({message: "Product not found in Cart "})
        }

        item.quantity = quantity
        item.totalprice = quantity* item.price

        await saveCartRedis(userId,cart)

        res.json({message:"Cart item updated", cart})
    } catch (error) {
        res.status(500).json({error: (error as Error).message })
    }
     

}

export const removeFromCart = async (req:Request,res:Response)=>{
    const {userId}= req.body
    const {productId}= req.params

    try {
       let cart:RedisCart = await getCartFormRedis(userId)
       if(!cart) {
        res.status(404).json({message: "Cart not found"})
        return
       }

       cart.products = cart.products.filter((p:RedisCartItem)=> p.product!== productId)
       await saveCartRedis(userId,cart)
      
       res.json({message: "Product removed",cart})
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}

export const checkoutCart = async (req:Request,res:Response) =>{
   
    const {userId}= req.body
    try {
        await syncCartToMongoDB(userId)
        res.json({ message: "Cart checked out and saved to DB." })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
        
    }
}

export const clearCart = async(req:Request,res:Response)=>{
    const {userId} = req.body
    try {
        const cart : RedisCart = await getCartFormRedis(userId)
        if(!cart){
            return res.status(404).json({message: "Cart not found "})
        }
        cart.products = []
        await saveCartRedis(userId,cart)

        res.json({message:"Cart cleared", cart})
    } catch (error) {
        res.status(500).json({error: (error as Error).message })
    }
}