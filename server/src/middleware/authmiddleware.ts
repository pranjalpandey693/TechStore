import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { User } from "../models";
import { IUser,JwtPayload } from "../interfaces";

export interface AuthRequest extends Request {
    user?: IUser
}



const unauthorizedResponse = (res: Response, message = "Unauthorized") => {
    res.status(401).json({ message });
  };


export const authenticate = async ( req: AuthRequest, res: Response, next: NextFunction)=> {
    const token = req.cookies?.token
   if(!token){  return unauthorizedResponse(res,"No token provided") } 
        
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload
            const user = await User.findById(decoded.id)
            if(!user)  {  return unauthorizedResponse(res,"User not found") }
        req.user = user
        next()

    }catch(err){
        return unauthorizedResponse(res,"token expired or invaild")
       
    }
}

export const isAdmin = (req:AuthRequest,res:Response,next:NextFunction)=>{
    if(!req.user?.isadmin){
       res.status(403).json({message: "Forbidden"})
       return
    }
    next()
}