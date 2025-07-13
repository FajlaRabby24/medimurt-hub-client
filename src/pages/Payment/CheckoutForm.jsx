import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart } = useCart();
  console.log(cart);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { state } = useLocation();
  console.log(state);
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState("");
  const [isPaymenting, setIsPaymenting] = useState(false);

  const grandTotal = state?.grand_total;
  const grandTotalInCents = parseFloat(grandTotal * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrors(error.message);
      setIsPaymenting(false);
    } else {
      setErrors("");
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I pay",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIsPaymenting(true);
          console.log({ paymentMethod });
          // create payment intent
          const res = await axiosSecure.post("/create-payment-intent", {
            grandTotalInCents,
          });
          const clientSecret = res.data?.clientSecret;

          // confirm payment
          const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: user?.displayName,
                email: user?.email,
              },
            },
          });

          if (result.error) {
            setErrors(result.error.message);
          } else {
            setErrors("");
            if (result.paymentIntent.status === "succeeded") {
              const transactionId = result.paymentIntent.id;

              const paymentRes = await axiosSecure.patch("/api/cart/update", {
                email: user?.email,
                transactionId,
              });

              console.log(paymentRes);
              setIsPaymenting(false);
              if (paymentRes.data.updatedCount) {
                await Swal.fire({
                  icon: "success",
                  title: "Payment Successful!",
                  html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                  confirmButtonText: "Go to Invoice page",
                });
              }
            }
          }
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 rounded p-3"
    >
      <CardElement className="border p-4 rounded-md" />
      <button
        type="submit"
        disabled={!stripe || isPaymenting}
        className="btn btn-primary w-full mt-6"
      >
        Pay{" "}
        {isPaymenting ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          `$${grandTotal}`
        )}
      </button>

      {errors && <p className="text-red-500 mt-2">{errors}</p>}
    </form>
  );
};

export default CheckoutForm;
