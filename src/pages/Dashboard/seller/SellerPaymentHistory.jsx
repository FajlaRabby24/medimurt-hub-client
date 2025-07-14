import { useQuery } from "@tanstack/react-query";
import LoadingSpiner from "../../../components/common/Loading/LoadingSpiner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SellerPaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["sellerPaymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/seller/payment-history?seller=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpiner />;

  return (
    <div className="p-4 max-w-7xl ">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-[800px] text-base">
          <thead className="text-lg bg-gray-100">
            <tr className="py-12">
              <th>#</th>
              <th>Medicine</th>
              <th>Buyer Email</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Status</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {payments.map((item, idx) => (
              <tr key={item._id}>
                <td className="py-5 px-3">{idx + 1}</td>
                <td>{item.medicine_name}</td>
                <td>{item.user_email}</td>
                <td className="text-center">{item.quantity}</td>
                <td>৳{item.total_price?.toFixed(2)}</td>
                <td>
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
                <td>
                  {item.transaction_id ? (
                    <code className="text-sm">{item.transaction_id}</code>
                  ) : (
                    <span className="text-red-500 text-sm">N/A</span>
                  )}
                </td>
                <td>
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

export default SellerPaymentHistory;
