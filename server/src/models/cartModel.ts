import mongoose, { Schema } from "mongoose";
import { CART_ITEM_STATUS, CartDocument, CartItem } from "../interfaces";

const CartItemSchema = new Schema<CartItem>({
    product: {type:Schema.Types.ObjectId, ref: "Product"},
    quantity:{type: Number,default:1},
    price:{type:Number,default:0},
    totalprice:{type:Number,default:0},
    status:{
        type:String,
        enum:Object.values(CART_ITEM_STATUS),
        default:CART_ITEM_STATUS.Not_processed
    },
})

const CartSchema = new Schema<CartDocument>({
    user:{type:Schema.Types.ObjectId,ref:"user",required:true},
    products: [CartItemSchema],
    updated: {type:Date,default:Date.now},
    created: {type:Date,default:Date.now}
})

export default mongoose.model<CartDocument>("Cart",CartSchema)