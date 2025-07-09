import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router";
import Logo from "../components/common/logo/Logo";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-[#edf2fe] w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-[#edf2fe] text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <Logo></Logo>
          <div className="space-y-2">
            <li className="mt-7">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `text-lg font-semibold ${isActive ? "active" : ""}`
                }
              >
                <FaHome size={25} className="inline-block mr-1" />
                Dashboard
              </NavLink>
            </li>
            {/* seller routes  */}
            {role === "seller" && !roleLoading && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/manage-medicine"
                    className={({ isActive }) =>
                      `text-lg font-semibold ${isActive ? "active" : ""}`
                    }
                  >
                    <FaHome size={25} className="inline-block mr-1" />
                    Manage medicine
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/ask-for-advertise"
                    className={({ isActive }) =>
                      `text-lg font-semibold ${isActive ? "active" : ""}`
                    }
                  >
                    <FaHome size={25} className="inline-block mr-1" />
                    Ask for Advertise
                  </NavLink>
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
