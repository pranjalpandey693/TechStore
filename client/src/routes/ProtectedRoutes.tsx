import { useAuth } from "@/hooks/useAuth";
import { useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

interface ProtectedRouteProps {
  allowedRoles?: Array<"admin" | "seller" | "customer">;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  const toastShown = useRef(false)

  if (!isAuthenticated && !user) {
    return <Navigate to="/auth/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user!.role!)) {
    if(!toastShown.current){
      toast.error("Access denied")
      toastShown.current = true
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
