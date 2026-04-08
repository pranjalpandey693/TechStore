import mongoose, { Schema } from "mongoose";
import {  CartDocument, CartItem } from "../interfaces";

const CartItemSchema = new Schema<CartItem>({
    productId: {type:Schema.Types.ObjectId, ref: "Product"},
    name:{type:String},
    quantity:{type: Number,default:1},
    price:{type:Number,default:0},
    totalprice:{type:Number,default:0},
   
})

const CartSchema = new Schema<CartDocument>({
    user:{type:Schema.Types.ObjectId,ref:"user",required:true},
    products: [CartItemSchema],
    totalCartPrice:{type:Number,default:0},
    updated: {type:Date,default:Date.now},
    created: {type:Date,default:Date.now}
})

export default mongoose.model<CartDocument>("Cart",CartSchema)