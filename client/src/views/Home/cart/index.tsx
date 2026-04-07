import { Spinner } from "@/components/ui/shadcn-io/spinner";
import type { CartItem } from "@/interfaces";
import type { AppDispatch, RootState } from "@/redux/store";
import {
  checkoutCart,
  clearEntireCart,
  removeItemCart,
  updateCartItem,
} from "@/redux/slices/CartSlice";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalAmount, isFetching } = useSelector(
    (state: RootState) => state.cart,
  );
  const { products } = useSelector((state: RootState) => state.product);

  const computedTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const displayTotal = totalAmount > 0 ? totalAmount : computedTotal;

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isClearingCart, setIsClearingCart] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (items.length === 0 || isCheckingOut) return;
    try {
      setIsCheckingOut(true);
      await dispatch(checkoutCart()).unwrap();
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleClearCart = async () => {
    if (items.length === 0 || isClearingCart) return;
    try {
      setIsClearingCart(true);
      await dispatch(clearEntireCart()).unwrap();
    } finally {
      setIsClearingCart(false);
    }
  };

  const handleUpdateQuantity = async (item: CartItem, delta: number) => {
    const productId = item.productId;
    const nextQuantity = item.quantity + delta;
    if (!productId || nextQuantity < 1 || updatingItemId === productId) return;

    try {
      setUpdatingItemId(productId.toString());
      await dispatch(updateCartItem({ productId: productId.toString(), quantity: nextQuantity })).unwrap();
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemoveItem = async (item: CartItem) => {
    const productId = item.productId?.toString();
    if (!productId || removingItemId === productId) return;

    try {
      setRemovingItemId(productId);
      await dispatch(removeItemCart(productId)).unwrap();
    } finally {
      setRemovingItemId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center gap-3">
        <ShoppingBag size={20} className="text-blue-600" />
        <h1 className="text-3xl font-bold">Your cart</h1>
      </div>

      {isFetching && (
        <div className="mt-8 flex items-center justify-center">
          <Spinner size={24} variant="bars" />
        </div>
      )}


      {!isFetching && items.length === 0 && (
        <div className="mt-10 text-center text-gray-600">
          Your cart is empty.
        </div>
      )}

      {!isFetching && items.length > 0 && (
        <>
          <div className="mt-8 overflow-x-auto bg-white rounded-lg shadow-sm border">
            <div className="min-w-[680px]">
              <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b bg-gray-50 text-sm font-semibold text-gray-700">
                <p className="col-span-6">Item</p>
                <p className="col-span-2 text-center">Price</p>
                <p className="col-span-3 text-center">Quantity</p>
                <p className="col-span-1 text-center"> </p>
              </div>

              {items.map((item: CartItem) => {
                const productId = String(item.productId);
                const name = String(item.name);
                const product = products.find((p) => p._id === productId);
                const imageSrc = product?.image;
                const isUpdatingThisItem = updatingItemId === productId;
                const isRemovingThisItem = removingItemId === productId;

                return (
                  <div
                    key={productId}
                    className="grid grid-cols-12 gap-4 px-4 py-4 border-b last:border-b-0 items-center"
                  >
                    <div className="col-span-6 flex items-center gap-3 min-w-0">
                      <div className="w-16 h-16 rounded-md bg-gray-100 border overflow-hidden flex items-center justify-center shrink-0">
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">
                            No image
                          </span>
                        )}
                      </div>

                      <p className="font-semibold text-gray-900 truncate">
                        {name}
                      </p>
                    </div>

                    <div className="col-span-2 text-center text-gray-700 font-medium">
                      ₹{item.price}
                    </div>

                    <div className="col-span-3 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item, -1)}
                        disabled={item.quantity <= 1 || isUpdatingThisItem}
                        className="w-8 h-8 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="min-w-6 text-center text-gray-700 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item, 1)}
                        disabled={isUpdatingThisItem}
                        className="w-8 h-8 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>

                    <div className="col-span-1 flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item)}
                        disabled={isRemovingThisItem}
                        className="text-red-600 hover:text-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-sm border p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-3xl font-bold">₹{displayTotal}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleClearCart}
                disabled={items.length === 0 || isClearingCart}
                className="px-4 py-2.5 rounded-md border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isClearingCart ? (
                  <Spinner size={18} variant="bars" />
                ) : (
                  <Trash2 size={16} />
                )}
                Clear Cart
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isCheckingOut || items.length === 0}
                className="px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isCheckingOut ? (
                  <Spinner size={20} variant="bars" />
                ) : (
                  "Checkout"
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
