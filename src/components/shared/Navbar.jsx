import { useQueryClient } from "@tanstack/react-query";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineLanguage } from "react-icons/hi2";
import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import defaultUser from "../../assets/images/defaultUser.png";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import Logo from "../common/logo/Logo";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const queryClient = useQueryClient();
  const { cart } = useCart();
  const navigate = useNavigate();

  const links = (
    <>
      <li>
        <NavLink className={"font-semibold"} to={"/"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={"font-semibold"} to={"/shop"}>
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink className={"font-semibold"} to={"/all-categories"}>
          All categories
        </NavLink>
      </li>
      <li>
        <NavLink className={"font-semibold"} to={"/about-me"}>
          About me
        </NavLink>
      </li>
      <li>
        <NavLink className={"font-semibold"} to={"/contact"}>
          Contact
        </NavLink>
      </li>
    </>
  );

  // handle sign out
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Sign out successfully!");
        queryClient.clear();
        navigate("/auth/join-us");
      })
      .catch((error) => {
        toast.error("Some went wrong. Please try again!");
      });
  };

  return (
    <nav className="max-w-7xl px-1 xl:px-0 mx-auto ">
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className=" pr-3  lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100  rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5">{links}</ul>
        </div>
        {/* navbar end  */}
        <div className="navbar-end md:gap-5">
          {/* Cart Icon */}
          {/* {!roleLoading && role === "admin" && ( */}
          <Link to={"/cart"}>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <FaShoppingCart size={25} />
                <span className="badge badge-sm indicator-item">
                  {cart.length || 0}
                </span>
              </div>
            </button>
          </Link>
          {/* // )} */}

          {/* Language Dropdown */}
          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost btn-sm">
              <HiOutlineLanguage size={25} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 z-50"
            >
              <li>
                <a>English</a>
              </li>
              <li>
                <a>বাংলা</a>
              </li>
            </ul>
          </div>

          {/* Join Us Button */}
          {user ? (
            <div className="dropdown dropdown-end  ml-5 ">
              <div className="avatar" tabIndex={0}>
                <div className="ring-primary ring-offset-base-100 w-9 rounded-full ring-2 ring-offset-2">
                  <img
                    src={user?.photoURL || defaultUser}
                    alt="user profile image"
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 space-y-2 w-max rounded-box z-1  shadow-sm"
              >
                <li>
                  <Link to={"/update-profile"} className="btn btn-warning ">
                    Update Profile
                  </Link>
                </li>
                <li className="w">
                  <Link to={"/dashboard"} className="btn btn-warning ">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="btn btn-warning">
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/auth/join-us"}>
              <button className="btn  ">Join Us</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
