import { useQuery } from "@tanstack/react-query";
import { ReTitle } from "re-title";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaHourglassHalf,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import LoadingSpiner from "../../../components/common/Loading/LoadingSpiner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user-specific order summary
  const { data, isLoading } = useQuery({
    queryKey: ["userOrderSummary", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/orders-summary`);
      return res.data; // { totalOrders, completedOrders, pendingOrders }
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpiner />;

  const COLORS = ["#16a34a", "#facc15", "#3b82f6"];

  const { totalOrders, completedOrders, pendingOrders, totalSpent } =
    data || {};
  // const totalOrders = 234;
  // const totalSpent = 312;
  const chartData = [
    { name: "Completed", value: completedOrders },
    { name: "Pending", value: pendingOrders },
    { name: "Total Orders", value: totalOrders },
  ];

  return (
    <div className="p-4 w-full">
      <ReTitle title="User Dashboard" />
      <h2 className="text-2xl font-bold mb-6">
        Welcome,{" "}
        <span className="text-primary">{user?.displayName || "User"}</span>!
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Orders */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaBoxOpen className="text-4xl" />
            <div>
              <p className="text-lg font-medium">Total Orders</p>
              <h3 className="text-2xl font-bold">{totalOrders || 0}</h3>
            </div>
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaCheckCircle className="text-4xl" />
            <div>
              <p className="text-lg font-medium">Completed Orders</p>
              <h3 className="text-2xl font-bold">{completedOrders || 0}</h3>
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaHourglassHalf className="text-4xl" />
            <div>
              <p className="text-lg font-medium">Pending Orders</p>
              <h3 className="text-2xl font-bold">{pendingOrders || 0}</h3>
            </div>
          </div>
        </div>

        {/* Total Spent */}
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaMoneyCheckAlt className="text-4xl" />
            <div>
              <p className="text-lg font-medium">Total Spent</p>
              <h3 className="text-2xl font-bold">
                ৳{totalSpent?.toFixed(2) || 0}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      {totalOrders ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value">
              {COLORS?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <h1 className="text-3xl font-semibold text-center pt-20">
          Currently you don't have any orders.
        </h1>
      )}
    </div>
  );
};

export default UserDashboard;
