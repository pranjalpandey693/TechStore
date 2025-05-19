import mongoose, { Schema} from "mongoose";
import { IProduct } from "../interfaces";

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: {type:Number,required:true},
  image: {type:Buffer}
});

export default mongoose.model<IProduct>("Product", ProductSchema);
