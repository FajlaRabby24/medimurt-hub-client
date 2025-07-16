import { useQuery } from "@tanstack/react-query";
import { ReTitle } from "re-title";
import { useState } from "react";
import LoadingSpiner from "../../../components/common/Loading/LoadingSpiner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserPaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["userPaymentHistory", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/users/payment-history?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const payments = data?.data || [];
  const totalPages = data?.totalPages || 0;

  if (isLoading || isFetching) return <LoadingSpiner />;

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

export default UserPaymentHistory;
