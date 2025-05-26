import mongoose from "mongoose";
import { CART_ITEM_STATUS, RedisCart,RedisCartItem } from "../interfaces";
import { Cart } from "../models";
import redisClient from "./redisClient";


const CART_EXPIRATION = 60 * 60 * 24 

export const saveCartRedis = async( userId: string , cart: RedisCart)=>{
    await redisClient.setex(`cart:${userId}`,CART_EXPIRATION, JSON.stringify(cart))
}

export const getCartFormRedis = async (userId:string)=>{

    const redisKey = `cart:${userId}`
   const cartData = await redisClient.get(redisKey)
    if (cartData){
        return JSON.parse(cartData)
    }

    const mongoCart = await Cart.findOne({userId})
    if(mongoCart){
        await redisClient.set(redisKey,JSON.stringify(mongoCart))
        return mongoCart
    }
    return null
}

export const deleteCartFromRedis = async(userId:string)=>{
    await redisClient.del(`cart:${userId}`)
}

export const syncCartToMongoDB = async (userId:string) =>{
    try {
        const redisCartdata = await  redisClient.get(`cart:${userId}`)
        if(!redisCartdata) return

         let redisCart: RedisCart
        try {
            redisCart = JSON.parse(redisCartdata)
        } catch (parseError) {
            console.log("Invalid cart JSON from redis",parseError);
            return
        }
        
        const formattedProducts = redisCart.products.map((item:RedisCartItem)=>({
            product: new mongoose.Types.ObjectId(item.product), 
            quantity: item.quantity,
            price: item.price,
            totalprice: item.totalprice,
            status: item.status as CART_ITEM_STATUS

        }))
        const totalCartPrice = formattedProducts.reduce((sum,item)=> sum+item.totalprice,0)
        const existingCart = await Cart.findOne({user: userId})
       
        if(existingCart){
            existingCart.products = formattedProducts 
            existingCart.totalCartPrice = totalCartPrice
            existingCart.updated = new Date()
            await existingCart.save()
           
        } else {

            await new Cart({
                user:userId,
                products:formattedProducts,
                totalCartPrice,
                created: new Date(),
                updated: new Date(),
        
            }).save()
           
        }
       await deleteCartFromRedis(userId)
        console.log(`Cart synced to Mongodb for user: ${userId}`);
    } catch (error) {
        console.log("error syncing cart to Mongodb:",error);
    }
}