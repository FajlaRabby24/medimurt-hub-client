import LoadingSpiner from "../../components/common/Loading/LoadingSpiner";
import useUserRole from "../../hooks/useUserRole";
import Forbidden from "../Forbidden";
import AdminDashboard from "./Admin/AdminDashboard";
import SellerDashboard from "./seller/SellerDashboard";
import UserDashboard from "./user/UserDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();
  if (roleLoading) {
    return <LoadingSpiner />;
  }

  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else if (role === "seller") {
    return <SellerDashboard></SellerDashboard>;
  } else if (role === "user") {
    return <UserDashboard></UserDashboard>;
  } else {
    return <Forbidden></Forbidden>;
  }
};

export default DashboardHome;
