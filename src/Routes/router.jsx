import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/Authentication/LoginPage";
import RegisterPage from "../pages/Authentication/RegisterPage";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AskForAdvertisement from "../pages/Dashboard/seller/AskForAdvertisement";
import Forbidden from "../pages/Forbidden";
import HomePage from "../pages/HomePage";
import PrivateRoute from "./PrivateRoute";
import SellerRouter from "./SellerRoute";

export const router = createBrowserRouter([
  // main layout
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
    ],
  },
  // authentication
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        path: "join-us",
        Component: LoginPage,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      // seller routes
      {
        path: "ask-for-advertise",
        element: (
          <SellerRouter>
            <AskForAdvertisement />
          </SellerRouter>
        ),
      },
    ],
  },
]);
