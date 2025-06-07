import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { AuthRequest } from "../middleware/authmiddleware";
import {  JwtPayload } from "../interfaces";

export const register = async (req: Request, res: Response) => {
  const { name, email, password,role } = req.body;
  const isadmin = role==="admin" 
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword ,role,isadmin});
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
  })
  const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SERCRET || "", {
    expiresIn: "1d",
  })
  await User.findByIdAndUpdate(user.id,{refreshToken})
  res.cookie("token",token,{
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
    sameSite:"none",
    maxAge:1*60*60*1000
  });
  res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
    sameSite:"none",
    maxAge:1*24*60*60*1000
  });
  res.json({user:user,message:"Logged in successfully"})}
  catch(error){
      res.status(500).json({error:"internal server error"})
  }
};

export const logout = (req:Request,res:Response)=>{
  res.clearCookie("token",{
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
    sameSite:"none",
     path: '/'
  })
  res.clearCookie('refreshToken',{
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', 
    path: '/'
  })
  res.json({success:true,message:"logged out successfully"})
  return
}

export const getme = async(req:AuthRequest,res:Response) =>{
  if(!req.user){
    res.status(401).json({message:"Unauthorized"})
  }
  res.json(req.user)
}

export const refreshToken = async(req:AuthRequest,res:Response)=>{
   try{const refreshToken = req.cookies.refreshToken

   if(!refreshToken){
    res.status(401).json({
      success:false,
      message:"No refresh token provided"
    })
   }

   const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SERCRET||'') as JwtPayload

   const user = await User.findById(decoded.id) 
   if(!user||user.refreshToken !== refreshToken){
    res.status(401).json({
      success:false,
      message:"Invalid refresh token"
      
       }
     )
     return
   }

   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", {
    expiresIn: "1h",
  })
   const newRefreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", {
    expiresIn: "1d",
  })
   await User.findByIdAndUpdate(user.id,{refreshToken:newRefreshToken})

   res.cookie('token',token,{
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 
   })
   res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1 * 24 * 60 * 60 * 1000 
  });

  res.status(200).json({
    success: true,
    user:user,
    message: 'Token refreshed successfully',
  })
  return
   }catch(error){
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    
    res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token'
    });
    
   }
}

export const verifyToken = async (req:AuthRequest,res:Response)=>{
 res.json({
  success: true,
  user:req.user!,
  message: 'token is valid',
 })
 return
}