import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Container from "../components/common/Ui/Container";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";

const CartPage = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryclient = useQueryClient();

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.total_price, 0);

  // delete item mutation
  const deleteItemMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/api/cart/${id}`);
    },
    onSuccess: () => {
      queryclient.invalidateQueries(["cart", user?.email]);
      toast.success("Item removed!");
    },
  });

  const handleDelete = (id) => {
    deleteItemMutation.mutate(id);
  };

  return (
    <Container>
      <section className="p-4 ">
        <h2 className="text-2xl font-bold mb-6">My Cart</h2>

        {cart.length === 0 ? (
          <p className="text-lg text-center">Your cart is empty.</p>
        ) : (
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
                        <button className="btn btn-xs btn-outline">
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button className="btn btn-xs btn-outline">
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

            {/* Bottom Actions */}
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xl font-semibold">
                Total: ${total.toFixed(2)}
              </div>
              <div className="flex gap-4">
                <button className="btn btn-warning">Clear Cart</button>
                <button className="btn btn-primary">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </Container>
  );
};

export default CartPage;
