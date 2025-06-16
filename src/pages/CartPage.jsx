import { useEffect, useState } from "react";
import { Trash2, ChevronRight } from "lucide-react";
import { apiService, getImageUrl } from "../services/api";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, setCartItems } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await apiService.get("/cart");
        setCartItems(response.data);
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [setCartItems]);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountPercentage = 20;
  const discountAmount = (subtotal * discountPercentage) / 100;
  const deliveryFee = 15;
  const total = subtotal - discountAmount + deliveryFee;

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm mb-6">
        <a href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </a>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="font-medium">Cart</span>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-extrabold mb-8">YOUR CART</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center py-4 border-b border-gray-100 last:border-0"
              >
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="ml-4 flex-grow">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <div className="text-sm text-gray-600">
                    <p>Storage: {item.storage}</p>
                    <p>Color: {item.color}</p>
                  </div>
                  <div className="font-bold text-lg mt-1">${item.price}</div>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 mr-6"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="flex items-center border border-gray-200 rounded-full">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-1 text-lg font-medium"
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-3 py-1 text-lg font-medium"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal}</span>
              </div>

              <div className="flex justify-between text-red-500">
                <span>Discount (-{discountPercentage}%)</span>
                <span>-${discountAmount}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">${deliveryFee}</span>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-xl">${total}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="flex mb-6 gap-4">
              <div className="relative w-full">
                <i className="fa-solid fa-tag absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Add promo code"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>
              <button className="bg-black text-white px-4 py-2 rounded-full">
                Apply
              </button>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-black text-white py-3 px-4 rounded-full flex items-center justify-center">
              <span className="mr-2">Go to Checkout</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
