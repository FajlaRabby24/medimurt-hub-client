import { FaHome, FaMoneyBillWave, FaPills, FaUserCircle } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdCampaign, MdCategory, MdOutlinePayment } from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
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
        <section className="bg-[#edf2fe] text-base-content min-h-full w-80 p-4 flex flex-col justify-between">
          {/* Top Section */}
          <div>
            <Logo />

            <ul className="menu mt-7 space-y-2">
              {/* Generic Dashboard Link */}
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `text-lg font-semibold ${isActive ? "active" : ""}`
                  }
                >
                  <FaHome size={25} className="inline-block mr-1" />
                  Overview
                </NavLink>
              </li>

              {/* Admin Routes */}
              {role === "admin" && !roleLoading && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/manage-advertise"
                      end
                      className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "active" : ""}`
                      }
                    >
                      <RiAdvertisementLine
                        size={25}
                        className="inline-block mr-1"
                      />
                      Manage Advertise
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manage-user"
                      end
                      className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "active" : ""}`
                      }
                    >
                      <HiOutlineUserGroup
                        size={25}
                        className="inline-block mr-1"
                      />
                      Manage User
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manage-category"
                      end
                      className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "active" : ""}`
                      }
                    >
                      <MdCategory size={25} className="inline-block mr-1" />
                      Manage Category
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manage-payments"
                      end
                      className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "active" : ""}`
                      }
                    >
                      <MdOutlinePayment
                        size={25}
                        className="inline-block mr-1"
                      />
                      Manage Payments
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/sales-report"
                      end
                      className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "active" : ""}`
                      }
                    >
                      <TbReportAnalytics
                        size={25}
                        className="inline-block mr-1"
                      />
                      Sales Report
                    </NavLink>
                  </li>
                </>
              )}

              {/* Seller Routes */}
              {role === "seller" && !roleLoading && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/manage-medicine"
                      className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "active" : ""}`
                      }
                    >
                      <FaPills size={25} className="inline-block mr-1" />
                      Manage Medicine
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ask-for-advertise"
                      className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "active" : ""}`
                      }
                    >
                      <MdCampaign size={25} className="inline-block mr-1" />
                      Ask for Advertise
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/payment-history"
                      className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "active" : ""}`
                      }
                    >
                      <FaMoneyBillWave
                        size={25}
                        className="inline-block mr-1"
                      />
                      Payment History
                    </NavLink>
                  </li>
                </>
              )}

              {/* User Routes */}
              {role === "user" && !roleLoading && (
                <li>
                  <NavLink
                    to="/dashboard/payment-history"
                    end
                    className={({ isActive }) =>
                      `text-lg font-semibold ${isActive ? "active" : ""}`
                    }
                  >
                    <MdOutlinePayment size={25} className="inline-block mr-1" />
                    Payment History
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Bottom Section */}
          <div>
            <ul className="menu space-y-2 w-full">
              <li className="min-w-full">
                <NavLink
                  to="/dashboard/profile"
                  end
                  className={({ isActive }) =>
                    `text-lg font-semibold ${isActive ? "active" : ""}`
                  }
                >
                  <FaUserCircle size={25} className="inline-block mr-1" />
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardLayout;
