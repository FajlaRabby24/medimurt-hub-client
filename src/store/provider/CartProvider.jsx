import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { CartContext } from "../contexts/contexts"; // must be created using createContext

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const { user, loading } = useAuth();
  const axiosPublic = useAxios();

  // get all cart info by user email
  const { data } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      setIsCartLoading(true);
      const cartRes = await axiosPublic.get(`/api/cart?email=${user?.email}`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setCart(cartRes.data, "data");
      setIsCartLoading(false);
      return cartRes.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  const cartValue = {
    cart,
    isCartLoading,
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
