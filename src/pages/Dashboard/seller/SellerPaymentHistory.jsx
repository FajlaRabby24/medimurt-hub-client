import { useQuery } from "@tanstack/react-query";
import { ReTitle } from "re-title";
import { useState } from "react";
import LoadingSpiner from "../../../components/common/Loading/LoadingSpiner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SellerPaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["sellerPaymentHistory", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/seller/payment-history?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  console.log(data);
  const payments = data?.data || [];
  const totalPages = data?.totalPages || 0;

  if (isLoading || isFetching) return <LoadingSpiner />;

  return (
    <div className="p-4 max-w-7xl ">
      <ReTitle title="Dashboard | Payment history" />
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

      {/* Pagination */}
      {limit < data?.totalCount && (
        <div className="flex justify-center mt-4">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                className={`join-item btn ${
                  page === num + 1 ? "btn-primary" : ""
                }`}
                onClick={() => setPage(num + 1)}
              >
                {num + 1}
              </button>
            ))}

            <button
              className="join-item btn"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerPaymentHistory;
