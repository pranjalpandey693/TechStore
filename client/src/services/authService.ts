
import {API} from './api'


class AuthApiService {
    

async loginUser  (data: {email:string ,password:string}){
    return API.post("/auth/login",data)
 }
 
 async registerUser  (data: {name:string,email:string ,password:string}){
   return  API.post("/auth/register",data)
 }

 async logoutUser (){
  return API.post("auth/logout")
 }
 
 async getCurrentUser (){ return API.get("/auth/me")}
 
 async refreshToken(){return API.post("auth/refresh")}

 async verifyToken(){return API.get('auth/verify')}
}


export const authApiService = new AuthApiService()