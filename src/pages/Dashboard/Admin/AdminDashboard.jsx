import { useQuery } from "@tanstack/react-query";
import { ReTitle } from "re-title";
import {
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
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["adminSalesSummary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/sales-summary");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpiner />;
  const COLORS = ["#16a34a", "#facc15", "#3b82f6"]; // green, yellow, blue

  const { totalRevenue, totalPaid, totalPending } = data;

  const chartData = [
    { name: "Paid", value: totalPaid },
    { name: "Pending", value: totalPending },
    { name: "Total Revenue", value: totalRevenue },
  ];

  return (
    <div className="p-4 w-full">
      <ReTitle title="Dashboard" />
      <h2 className="text-2xl font-bold mb-6">
        Welcome, <span className="text-primary">Admin</span>!
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaMoneyCheckAlt className="text-4xl" />
            <div>
              <p className="text-lg">Total Revenue</p>
              <h3 className="text-2xl font-bold">${totalRevenue || 0}</h3>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaCheckCircle className="text-4xl" />
            <div>
              <p className="text-lg">Paid Orders</p>
              <h3 className="text-2xl font-bold">${totalPaid || 0}</h3>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaHourglassHalf className="text-4xl" />
            <div>
              <p className="text-lg">Pending Orders</p>
              <h3 className="text-2xl font-bold">${totalPending || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* charts  */}
      {totalRevenue ? (
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
          Currently you don't have any revenue.
        </h1>
      )}
    </div>
  );
};

export default AdminDashboard;
