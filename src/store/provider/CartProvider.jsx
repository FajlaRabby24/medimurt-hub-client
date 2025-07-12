import { useState } from "react";
import { CartContext } from "../contexts/contexts";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setIsLoading] = useState(false);

  // add to cart
  const addToCart = async (item) => {
    // console.log(item);
  };

  // remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i._id !== id));
  };

  // clear cart
  const clearCart = () => setCart([]);
  const cartValue = {
    addToCart,
    removeFromCart,
    clearCart,
    cart,
  };

  return <CartContext value={cartValue}>{children}</CartContext>;
};

export default CartProvider;
