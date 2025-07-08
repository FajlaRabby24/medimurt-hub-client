import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router";

import { HiOutlineLanguage } from "react-icons/hi2";
import Logo from "../common/logo/Logo";

const Navbar = () => {
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
    </>
  );

  return (
    <nav className="max-w-7xl mx-auto">
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
        <div className="navbar-end gap-5">
          {/* Cart Icon */}
          <Link to={"/cart"}>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <FaShoppingCart size={25} />
                <span className="badge badge-sm indicator-item">3</span>
              </div>
            </button>
          </Link>

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
              <li>
                <a>Español</a>
              </li>
            </ul>
          </div>

          {/* Join Us Button */}
          <Link to={"/auth/join-us"}>
            <button className="btn  ">Join Us</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
