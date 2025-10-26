import { addItemCart } from "@/redux/slices/CartSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AddToCartProps {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export const useAddToCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleAddToCart = async ({
    productId,
    name,
    quantity,
    price,
  }: AddToCartProps) => {
    if (!isAuthenticated) {
      toast.warning("Please login to add items to your cart");
      navigate("/auth/login", { state: { from: location.pathname } });
      return;
    }

    await dispatch(addItemCart({ productId, name, quantity, price })).unwrap();
  };

  return { handleAddToCart };
};
