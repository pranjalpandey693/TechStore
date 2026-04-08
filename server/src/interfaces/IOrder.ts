import mongoose from "mongoose";
import { Types } from "mongoose";

export enum ORDER_STATUS {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export interface OrderItem {
  productId: Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  totalprice: number;
}

export interface OrderDocument extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  products: OrderItem[];
  totalOrderPrice: number;
  orderStatus: ORDER_STATUS;
  paymentIntent?: string;
  updated: Date;
  created: Date;
}
