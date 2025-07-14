import { Navigate } from "react-router";
import LoadingSpiner from "../../components/common/Loading/LoadingSpiner";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import SellerPaymentHistory from "./seller/SellerPaymentHistory";
import UserPaymentHistory from "./user/UserPaymentHistory";

const PaymentHistoryRoute = () => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) return <LoadingSpiner />;

  if (!user) return <Navigate to="/auth/join-us" />;

  if (role === "seller") {
    return <SellerPaymentHistory />;
  } else if (role === "user") {
    return <UserPaymentHistory />;
  } else {
    return <Navigate to="/forbidden" />;
  }
};

export default PaymentHistoryRoute;
