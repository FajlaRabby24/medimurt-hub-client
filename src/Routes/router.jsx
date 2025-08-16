import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AboutMe from "../pages/AboutMe";
import AllCategories from "../pages/AllCategories";
import LoginPage from "../pages/Authentication/LoginPage";
import RegisterPage from "../pages/Authentication/RegisterPage";
import CartPage from "../pages/CartPage";
import CategoryDetailsPage from "../pages/CategoryDetailsPage";
import Contact from "../pages/ContactMe";
import ManageBannerAdvertise from "../pages/Dashboard/Admin/ManageBannerAdvertise";
import ManageCategory from "../pages/Dashboard/Admin/ManageCategory";
import ManagePayments from "../pages/Dashboard/Admin/ManagePayments";
import ManageUsers from "../pages/Dashboard/Admin/ManageUser";
import SalesReport from "../pages/Dashboard/Admin/SalesReport";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import PaymentHistoryRoute from "../pages/Dashboard/PaymentHistoryRoute";
import ProfilePage from "../pages/Dashboard/ProfilePage";
import AskForAdvertisement from "../pages/Dashboard/seller/AskForAdvertisement";
import ManageMedicine from "../pages/Dashboard/seller/ManageMedicine";
import Forbidden from "../pages/Forbidden";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import CheckoutPage from "../pages/Payment/CheckoutPage";
import InvoicePage from "../pages/Payment/InvoicePage";
import ShopPage from "../pages/ShopPage";
import UpdateProfile from "../pages/UpdateProfile";
import AdminRoute from "./AdminRoute";
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
        path: "shop",
        Component: ShopPage,
      },
      {
        path: "about-me",
        Component: AboutMe,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "categories/:category",
        Component: CategoryDetailsPage,
      },
      {
        path: "all-categories",
        Component: AllCategories,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: "payment/checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },

      {
        path: "payment/invoice",
        element: (
          <PrivateRoute>
            <InvoicePage />
          </PrivateRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
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
  // dashboard
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
      {
        path: "payment-history",
        Component: PaymentHistoryRoute,
      },
      {
        path: "profile",
        Component: ProfilePage,
      },
      // admin routes
      {
        path: "manage-user",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-category",
        element: (
          <AdminRoute>
            <ManageCategory />
          </AdminRoute>
        ),
      },

      {
        path: "manage-advertise",
        element: (
          <AdminRoute>
            <ManageBannerAdvertise />
          </AdminRoute>
        ),
      },
      {
        path: "manage-payments",
        element: (
          <AdminRoute>
            <ManagePayments />
          </AdminRoute>
        ),
      },
      {
        path: "sales-report",
        element: (
          <AdminRoute>
            <SalesReport />
          </AdminRoute>
        ),
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
      {
        path: "manage-medicine",
        element: (
          <SellerRouter>
            <ManageMedicine />
          </SellerRouter>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
