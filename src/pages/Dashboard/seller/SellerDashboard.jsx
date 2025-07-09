import {
  FaCheckCircle,
  FaHourglassHalf,
  FaMoneyBillWave,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const SellterDashboard = () => {
  const { user } = useAuth();

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
              <h3 className="text-2xl font-bold">$0</h3>
            </div>
          </div>
        </div>

        {/* Paid */}
        <div className="bg-gradient-to-r from-blue-300 to-blue-500 text-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaCheckCircle className="text-4xl" />
            <div>
              <p className="text-lg">Paid Orders</p>
              <h3 className="text-2xl font-bold">$ 0</h3>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaHourglassHalf className="text-4xl" />
            <div>
              <p className="text-lg">Pending Orders</p>
              <h3 className="text-2xl font-bold">$0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellterDashboard;
