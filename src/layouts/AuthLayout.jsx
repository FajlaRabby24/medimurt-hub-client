import Lottie from "lottie-react";
import { Outlet } from "react-router";
import registerLotties from "../assets/lotties/registerLotties.json";
import Logo from "../components/common/logo/Logo";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10 ">
      <div className="pt-2 md:pt-4">
        <Logo />
      </div>
      <div className="min-h-[calc(100vh-70px)] flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-1/2">
          <Outlet />
        </div>
        <figure className="w-full md:w-1/2">
          <Lottie animationData={registerLotties} loop={true} />
        </figure>
      </div>
    </div>
  );
};

export default AuthLayout;
