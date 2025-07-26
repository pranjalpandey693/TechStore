import type { RootState } from "@/redux/store";
import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



export  const ProtectedRoute = ({children}: {children: JSX.Element})=>{
      const user = useSelector((state:RootState)=>state.auth.user)
     return  user ? children : <Navigate to="/login"/>
       
}

export const AdminRoute = 