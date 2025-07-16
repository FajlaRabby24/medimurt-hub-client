import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReTitle } from "re-title";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Container from "../components/common/Ui/Container";
import EmptyState from "../components/common/Ui/EmptyState";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";

const CartPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.total_price, 0);

  // delete item mutation
  const deleteItemMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/api/users/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.email]);
      toast.success("Item removed!");
    },
  });
  const handleDelete = (id) => {
    deleteItemMutation.mutate(id);
  };

  // Mutation for updating quantity
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ _id, quantity, total_price }) => {
      const res = await axiosSecure.patch(`/api/users/cart/${_id}`, {
        quantity,
        total_price,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: () => {
      toast.error("Failed to update quantity");
    },
  });
  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    const totalPrice =
      (item.price - (item.price * item.discount) / 100) * newQuantity;
    if (newQuantity < 1) return;

    updateQuantityMutation.mutate({
      _id: item._id,
      quantity: newQuantity,
      total_price: totalPrice,
    });
  };

  // handle clear cart
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.delete(`/api/users/cart/clear`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again!");
    },
  });
  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Clear cart!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCartMutation.mutate();
      }
    });
  };
  // handle proceed checkout
  const proceedCheckout = () => {
    if (!user) {
      return navigate("/auth/join-us", { state: { from: location.pathname } });
    }

    navigate(`/payment/checkout`, {
      state: { grand_total: total },
    });
  };

  return (
    <Container className={"pb-20"}>
      <ReTitle title="Cart" />
      <section className="p-4 ">
        <h2 className="text-2xl font-bold mb-6">My Cart</h2>

        {cart.length === 0 ? (
          <EmptyState
            className="p-10"
            title="Your cart is empty."
            description="Go to the shop page and add to your cart."
            btnLink="/shop"
            icon={<FaShop size={20} />}
            btnText="Shop"
          />
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.medicine_name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td>{item.medicine_name}</td>
                      <td>{item.company_name}</td>
                      <td>
                        $
                        {(
                          item.price -
                          (item.price * item.discount) / 100
                        ).toFixed(2)}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item, -1)}
                            className="btn btn-xs btn-outline"
                          >
                            <FaMinus />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item, 1)}
                            className="btn btn-xs btn-outline"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </td>
                      <td>${item.total_price}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-sm btn-error text-white"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xl font-semibold">
                Total: ${total.toFixed(2)}
              </div>
              <div className="flex gap-4">
                <button onClick={handleClearCart} className="btn btn-warning">
                  Clear Cart
                </button>
                <button onClick={proceedCheckout} className="btn btn-primary">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </Container>
  );
};

export default CartPage;
