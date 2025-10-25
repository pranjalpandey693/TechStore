import type { RootState } from "@/redux/store"
import { useSelector } from "react-redux"



export const useAuth = ()=>{
     const {user,isAuthenticated} = useSelector((state:RootState)=>(state.auth))

     const isAdmin = user?.role === "admin"
     const isSeller = user?.role === "seller"
     const isCustomer = user?.role === "customer"

     return {user,isAuthenticated,isAdmin,isSeller,isCustomer}
}