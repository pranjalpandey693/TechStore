import {API} from './api'


class AuthApiService {
    

async loginUser  (data: {email:string ,password:string}){
    return API.post("/auth/login",data)
 }
 
 async registerUser  (data: {name:string,email:string ,password:string}){
   return  API.post("/auth/register",data)
 }
 
 async getCurrentUser (){ return API.get("/auth/me")}
}

export const authApiService = new AuthApiService()