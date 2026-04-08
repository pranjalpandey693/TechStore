import mongoose, { Schema } from "mongoose";
import { OrderDocument, OrderItem, ORDER_STATUS } from "../interfaces";

const OrderItemSchema = new Schema<OrderItem>({
    productId: {type:Schema.Types.ObjectId, ref: "Product"},
    name: {type:String},
    quantity: {type:Number},
    price: {type:Number},
    totalprice: {type:Number},
})

const OrderSchema = new Schema<OrderDocument>({
    user: {type:Schema.Types.ObjectId, ref: "User"},
    products: [OrderItemSchema],
    totalOrderPrice: {type:Number},
    orderStatus: {type:String, enum: Object.values(ORDER_STATUS), default: ORDER_STATUS.Pending},
    paymentIntent: {type:String},
    updated: {type:Date, default: Date.now},
    created: {type:Date, default: Date.now},
})

export default mongoose.model<OrderDocument>("Order", OrderSchema)