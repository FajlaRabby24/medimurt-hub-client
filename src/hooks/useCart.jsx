import { use } from "react";
import { CartContext } from "../store/contexts/contexts";

const useCart = () => {
  const cartValue = use(CartContext);
  return cartValue;
};

export default useCart;
