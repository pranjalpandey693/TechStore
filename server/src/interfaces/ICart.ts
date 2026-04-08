import mongoose from "mongoose";
import { Types } from "mongoose";




export interface CartItem {
    productId: Types.ObjectId
    name:string
    quantity: number
    price: number
    totalprice: number

}

export interface CartDocument extends mongoose.Document {
    user: mongoose.Schema.Types.ObjectId
    products:CartItem[]
    totalCartPrice:number
    updated: Date
    created: Date
}