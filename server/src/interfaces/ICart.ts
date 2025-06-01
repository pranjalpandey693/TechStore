import mongoose from "mongoose";
import { Types } from "mongoose";


export enum CART_ITEM_STATUS{
    Not_processed = "Not_processed",
    Processing = "Processing",
    Shipped = "Shipped",
    Delivered ="Delivered",
    Cancelled = "Cancelled"
}

export interface CartItem {
    product: Types.ObjectId
    name:string
    quantity: number
    price: number
    totalprice: number
    status: CART_ITEM_STATUS
}

export interface CartDocument extends mongoose.Document {
    user: mongoose.Schema.Types.ObjectId
    products:CartItem[]
    totalCartPrice:number
    updated: Date
    created: Date
}