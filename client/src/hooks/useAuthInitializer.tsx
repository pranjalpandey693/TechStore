import {
  getCurrentUser,
  logoutUser,
  refreshToken,
} from "@/redux/slices/authSlice";
import { fetchCart } from "@/redux/slices/CartSlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import type { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useAuthInitializer = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initializeAuth = async () => {
        dispatch(fetchProducts({}))
      try {
        await dispatch(getCurrentUser()).unwrap();


        dispatch(fetchCart())
      } catch (error) {
        try {
          await dispatch(refreshToken()).unwrap();
          await dispatch(getCurrentUser()).unwrap();
        } catch (refreshError) {
          dispatch(logoutUser({silent:true}));
        }
      }
    };
    initializeAuth();
  }, [dispatch]);
};

export default useAuthInitializer;
