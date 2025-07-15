import { ReTitle } from "re-title";
import defaultUserImg from "../../../assets/images/defaultUser.png";
import useAuth from "../../../hooks/useAuth";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <ReTitle title="Dashboard" />
      <h2 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h2>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user?.photoURL || defaultUserImg}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">
              {user?.displayName || "Unknown User"}
            </h3>
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            {user?.metadata?.creationTime && (
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Joined:</span>{" "}
                {new Date(user.metadata.creationTime).toLocaleDateString(
                  "en-BD",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            )}
            {/* Optional Role Info */}
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Role:</span> User
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
