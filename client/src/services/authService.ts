import {API} from './api'

export const loginUser = (data: {email:string ,password:string})=>{
    API.post("/auth/login",data)
}

export const registerUser = (data: {name:string,email:string ,password:string})=>{
    API.post("/auth/register",data)
}

export const getCurrentUser = () => API.get("/auth/me")