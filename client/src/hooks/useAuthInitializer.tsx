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
      try {
        await dispatch(getCurrentUser()).unwrap();

        dispatch(fetchProducts({})).unwrap();

        dispatch(fetchCart()).unwrap();
      } catch (error) {
        try {
          await dispatch(refreshToken()).unwrap();
          await dispatch(getCurrentUser()).unwrap();
        } catch (refreshError) {
          dispatch(logoutUser());
        }
      }
    };
    initializeAuth();
  }, [dispatch]);
};

export default useAuthInitializer;
