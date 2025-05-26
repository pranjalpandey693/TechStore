import { Request,Response } from "express"
import { getCartFormRedis, saveCartRedis, syncCartToMongoDB } from "../utils"
import { CART_ITEM_STATUS, IUser, RedisCart,RedisCartItem } from "../interfaces"
import { Document } from "mongoose"

interface AuthRequest extends Request {
    user?: IUser & Document
}


export const getCart = async(req:AuthRequest,res:Response)=>{
    const userId = req.user?._id?.toString()
    if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return
      }
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


export const addToCart = async(req:AuthRequest,res:Response)=>{

    const userId = req.user?._id?.toString()
    if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return
      }
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
       const totalCartPrice = cart.products.reduce((acc,item)=> acc+item.totalprice,0)

       const updatedCart = {
        ...cart,
       totalCartPrice: totalCartPrice,
       }

        await saveCartRedis(userId,updatedCart)
        res.json({message:"Product added to cart",updatedCart})
        
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}

export const updateCart = async (req:AuthRequest,res:Response)=>{
    const userId = req.user?._id?.toString()
    if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return
      }
     const {productId} = req.params
     const {quantity} = req.body

     try {
        const cart : RedisCart = await getCartFormRedis(userId)
        if(!cart){
             res.status(404).json({message: "Cart not found "})
             return
        }

        const item = cart.products.find((p)=>p.product===productId)
        if(!item){
             res.status(404).json({message: "Product not found in Cart "})
             return
        }

        item.quantity = quantity
        item.totalprice = quantity* item.price

        const totalCartPrice = cart.products.reduce((acc,item)=> acc+item.totalprice,0)

       const updatedCart = {
        ...cart,
       totalCartPrice: totalCartPrice,
       }

        

        await saveCartRedis(userId,updatedCart)

        res.json({message:"Cart item updated", updatedCart})
    } catch (error) {
        res.status(500).json({error: (error as Error).message })
    }
     

}

export const removeFromCart = async (req:AuthRequest,res:Response)=>{
    const userId = req.user?._id?.toString()
    if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return
      }
    const {productId}= req.params

    try {
       let cart:RedisCart = await getCartFormRedis(userId)
       if(!cart) {
        res.status(404).json({message: "Cart not found"})
        return
       }

       cart.products = cart.products.filter((p:RedisCartItem)=> p.product!== productId)
       cart.totalCartPrice = cart.products.reduce((acc,item)=> acc+item.totalprice,0)
       await saveCartRedis(userId,cart)
      
       res.json({message: "Product removed",cart})
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}

export const checkoutCart = async (req:AuthRequest,res:Response) =>{
   
    const userId = req.user?._id?.toString()
    if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return
      }
    try {
        await syncCartToMongoDB(userId)
        res.json({ message: "Cart checked out and saved to DB." })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
        
    }
}

export const clearCart = async(req:AuthRequest,res:Response)=>{
    const userId = req.user?._id?.toString()
    if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return
      }
    try {
        const cart : RedisCart = await getCartFormRedis(userId)
        if(!cart){
             res.status(404).json({message: "Cart not found "})
             return
        }
        cart.products = []
        await saveCartRedis(userId,cart)

        res.json({message:"Cart cleared", cart})
    } catch (error) {
        res.status(500).json({error: (error as Error).message })
    }
}