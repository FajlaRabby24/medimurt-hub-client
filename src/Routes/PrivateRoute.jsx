import { Navigate, useLocation } from "react-router";
import LoadingSpiner from "../components/common/Loading/LoadingSpiner";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const locaiton = useLocation();

  if (loading) {
    return <LoadingSpiner />;
  }

  if (!user) {
    return <Navigate to={"/auth/join-us"} state={locaiton.pathname} />;
  }

  return children;
};

export default PrivateRoute;
