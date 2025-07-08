import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center">
      <img src={"/logo.png"} className="w-[50px]" alt="logo" />
      <h3 className="text-xl font-semibold">MediMart Hub</h3>
    </Link>
  );
};

export default Logo;
