import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import LoadingSpiner from "../../components/common/Loading/LoadingSpiner";
import useCart from "../../hooks/useCart";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutPage = () => {
  const { cart, isCartLoading } = useCart();
  const navigate = useNavigate();

  // ✅ Redirect using useEffect
  useEffect(() => {
    if (!isCartLoading && cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, isCartLoading, navigate]);

  if (isCartLoading) return <LoadingSpiner />;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
