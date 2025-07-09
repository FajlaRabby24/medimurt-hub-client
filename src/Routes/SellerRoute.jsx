import { Navigate } from "react-router";
import LoadingSpiner from "../components/common/Loading/LoadingSpiner";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const SellerRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <LoadingSpiner />;
  }

  if (!user || role !== "seller") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }

  return children;
};

export default SellerRouter;
