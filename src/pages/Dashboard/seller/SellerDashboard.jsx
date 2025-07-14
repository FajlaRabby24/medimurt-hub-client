import { useQuery } from "@tanstack/react-query";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaMoneyBillWave,
} from "react-icons/fa";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import LoadingSpiner from "../../../components/common/Loading/LoadingSpiner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SellterDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: summary = {}, isLoading } = useQuery({
    queryKey: ["sellerSalesSummary", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/seller/sales-summary?email=${user.email}`
      );
      return res.data;
    },
  });

  console.log(summary);
  if (isLoading) return <LoadingSpiner />;

  const { totalRevenue = 0, totalPaid = 0, totalPending = 0 } = summary;
  const COLORS = ["#16a34a", "#facc15", "#3b82f6"]; // green, yellow, blue
  const chartData = [
    { name: "Paid", value: totalPaid },
    { name: "Pending", value: totalPending },
    { name: "Total Revenue", value: totalRevenue },
  ];

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-6">
        Welcome back, {user?.displayName || "Seller"}!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="bg-gradient-to-r from-green-300 to-green-500 text-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaMoneyBillWave className="text-4xl" />
            <div>
              <p className="text-lg">Total Revenue</p>
              <h3 className="text-2xl font-bold">${totalRevenue}</h3>
            </div>
          </div>
        </div>

        {/* Paid */}
        <div className="bg-gradient-to-r from-blue-300 to-blue-500 text-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaCheckCircle className="text-4xl" />
            <div>
              <p className="text-lg">Paid Orders</p>
              <h3 className="text-2xl font-bold">$ {totalPaid}</h3>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaHourglassHalf className="text-4xl" />
            <div>
              <p className="text-lg">Pending Orders</p>
              <h3 className="text-2xl font-bold">${totalPending}</h3>
            </div>
          </div>
        </div>
      </div>
      {/* charts  */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `৳${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellterDashboard;
