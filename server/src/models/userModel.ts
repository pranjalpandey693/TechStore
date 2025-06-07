import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isadmin: { type: Boolean, default: false },
  role:{type:String,default:"user"},
  refreshToke:{type:String,default:null}

});

export default mongoose.model<IUser>("User", UserSchema);
