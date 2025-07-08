import Lottie from "lottie-react";
import { Outlet } from "react-router";
import registerLotties from "../assets/lotties/registerLotties.json";
import Logo from "../components/common/logo/Logo";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="pl-12 pt-2">
        <Logo />
      </div>
      <div className="min-h-[calc(100vh-58px)] flex items-center justify-between ">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <figure className="flex-1">
          <Lottie animationData={registerLotties} loop={true} />
        </figure>
      </div>
    </div>
  );
};

export default AuthLayout;
