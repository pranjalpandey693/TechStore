import { getCurrentUser, logoutUser, refreshToken } from "@/redux/slices/authSlice";
import type { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



const useAuthInitializer = () => {
    const dispatch = useDispatch<AppDispatch>()
       
    useEffect(()=>{
       const initializeAuth = async ()=>{
        const token = localStorage.getItem('token')

        if(!token){
            return
        }

        try {
            await dispatch(getCurrentUser()).unwrap()
            
        } catch (error) {
            try {
                await dispatch(refreshToken()).unwrap()
                await dispatch(getCurrentUser()).unwrap()
            } catch (refreshError) {
                dispatch(logoutUser()).unwrap()
            }
        }
       }
       initializeAuth()
    },[dispatch])
  
}

export default useAuthInitializer;
