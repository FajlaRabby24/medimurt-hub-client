import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/common/Loading/LoadingSpiner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManagePayments = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all users with cart data grouped by email
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/cart/all-payments");
      return res.data;
    },
    staleTime: 0,
  });

  // Accept payment mutation
  const acceptPaymentMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(
        `/api/cart/accept-payment?email=${email}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allPayments"]);
      Swal.fire("Success", "Payment accepted!", "success");
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong", "error");
    },
  });

  const handleAccept = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are accepting the payment for this user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        acceptPaymentMutation.mutate(email);
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  console.log(payments);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Payments</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-[700px]">
          <thead>
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Transaction ID</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((user, idx) => (
              <tr key={user.user_email}>
                <td>{idx + 1}</td>
                <td>{user.user_email}</td>
                <td>
                  {user.transaction_id || (
                    <span className="text-red-500">N/A</span>
                  )}
                </td>
                <td>{user.total_price?.toFixed(2)}$</td>
                <td>
                  <span
                    className={`badge ${
                      user.payment_status === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {user.payment_status}
                  </span>
                </td>
                <td>
                  {user.payment_status === "pending" ? (
                    <button
                      disabled={!user.transaction_id}
                      onClick={() => handleAccept(user.user_email)}
                      className="btn btn-sm btn-primary"
                    >
                      Accept Payment
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      Accepted
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePayments;
