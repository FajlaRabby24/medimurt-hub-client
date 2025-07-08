import Lottie from "lottie-react";
import { Outlet } from "react-router";
import registerLotties from "../assets/lotties/registerLotties.json";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-between max-w-7xl mx-auto">
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
      <figure className="flex-1">
        <Lottie animationData={registerLotties} loop={true} />
      </figure>
    </div>
  );
};

export default AuthLayout;
