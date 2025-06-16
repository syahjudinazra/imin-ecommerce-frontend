import { createContext, useContext, useState } from "react";
import { apiService } from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [notification, setNotification] = useState("");

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
    setCartCount((prev) => prev + item.quantity);

    setNotification("Product added to cart!");
    setTimeout(() => setNotification(""), 3000);
  };

  const increaseQuantity = async (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    try {
      await apiService.put(`/cart/${id}`, {
        quantity: updatedItems.find((item) => item.id === id)?.quantity,
      });
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartCount,
        addToCart,
        increaseQuantity,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
