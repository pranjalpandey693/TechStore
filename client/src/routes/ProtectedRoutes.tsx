import { useAuth } from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"



interface ProtectedRouteProps {
    allowedRoles?: Array<"admin"| "seller" | "customer">
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({allowedRoles})=>{

const {user,isAuthenticated} = useAuth()

if(isAuthenticated){
    return <Navigate to="/auth/login" replace  />
}
if(allowedRoles && !allowedRoles.includes(user!.role!)){
    return <Navigate to="/" replace />
}



 return <Outlet/>
}

export default ProtectedRoute