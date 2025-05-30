import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { AuthRequest } from "../middleware/authmiddleware";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try{const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: "Invalid Credentials" });
    return;
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", {
    expiresIn: "1d",
  });
  res.cookie("token",token,{
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
    sameSite:"none",
    maxAge:1*24*60*60*1000
  });
  res.json({message:"Logged in successfully"})}
  catch(error){
      res.status(500).json({error:"internal server error"})
  }
};

export const logout = (req:Request,res:Response)=>{
  res.clearCookie("token",{
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
    sameSite:"none",
  })
  res.json({message:"logged out successfully"})
}

export const getme = async(req:AuthRequest,res:Response) =>{
  if(!req.user){
    res.status(401).json({message:"Unauthorized"})
  }
  res.json(req.user)
}