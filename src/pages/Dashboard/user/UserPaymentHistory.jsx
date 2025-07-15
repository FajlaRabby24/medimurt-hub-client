import { useQuery } from "@tanstack/react-query";
import { ReTitle } from "re-title";
import LoadingSpiner from "../../../components/common/Loading/LoadingSpiner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserPaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["userPaymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/users/payment-history?user=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpiner />;

  return (
    <div className="p-4 max-w-7xl">
      <ReTitle title="Dashboard | Payment history" />
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        My Payment History
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-[800px] text-base">
          <thead className="text-lg bg-gray-100">
            <tr>
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Medicine</th>
              <th className="py-2 px-3">Seller Email</th>
              <th className="py-2 px-3">Qty</th>
              <th className="py-2 px-3">Total</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Transaction ID</th>
              <th className="py-2 px-3">Date</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {payments.map((item, idx) => (
              <tr key={item._id}>
                <td className="py-2 px-3">{idx + 1}</td>
                <td className="py-2 px-3">{item.medicine_name}</td>
                <td className="py-2 px-3">{item.seller_email}</td>
                <td className="py-2 px-3 text-center">{item.quantity}</td>
                <td className="py-2 px-3">৳{item.total_price?.toFixed(2)}</td>
                <td className="py-2 px-3">
                  <span
                    className={`badge text-sm ${
                      item.payment_status === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {item.payment_status}
                  </span>
                </td>
                <td className="py-2 px-3">
                  {item.transaction_id ? (
                    <code className="text-sm">{item.transaction_id}</code>
                  ) : (
                    <span className="text-red-500 text-sm">N/A</span>
                  )}
                </td>
                <td className="py-2 px-3">
                  {new Date(item.created_at).toLocaleDateString("en-BD", {
                    dateStyle: "medium",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPaymentHistory;
