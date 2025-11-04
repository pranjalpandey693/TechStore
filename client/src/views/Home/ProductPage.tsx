import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useAddToCart } from "@/hooks/useAddToCart";
import { fetchProductById } from "@/redux/slices/productSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { currentProduct, loading } = useSelector(
    (state: RootState) => state.product
  );
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { handleAddToCart } = useAddToCart();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-center">
        <Spinner size={24} variant="bars" />
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="max-w-7xl mx-auto p-4 text-center">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }
 

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center md:w-1/2">
          <img
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className=" object-contain hover:scale-105 transition-transform duration-300 w-full max-w-md rounded-lg shadow"
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center mt-4 gap-2 "
            onClick={() =>
              handleAddToCart({
                productId: currentProduct._id,
                name: currentProduct.name,
                quantity: 1,
                price: currentProduct.price,
              })
            }
          >
            <ShoppingBag size={16} /> Add To Cart
          </button>
        </div>

        <div className="md:w-1/2 flex flex-col justify-center gap-4">
          <h2 className="text-3xl font-bold"> {currentProduct?.name}</h2>
          <p className="text-2xl font-semibold text-primary mt-2">
            ₹{currentProduct?.price}
          </p>
          <p className="mt-4 text-gray-600">{currentProduct?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
