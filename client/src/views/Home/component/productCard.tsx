import { useAddToCart } from "@/hooks/useAddToCart";
import type { Product } from "@/interfaces";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const arg = {
    productId: product._id,
    name: product.name,
    quantity: 1,
    price: product.price,
  };

  const { handleAddToCart } = useAddToCart();

  return (
    <div className="bg-white p-2 border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow group ">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full   h-48 object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-4 text-gray-900">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl  font-bold text-gray-900">
            ₹{product.price}
          </span>
          <button
            onClick={() => handleAddToCart(arg)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center px-4 py-2"
          >
            <ShoppingBag size={16} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
