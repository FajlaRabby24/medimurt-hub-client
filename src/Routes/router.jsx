import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import RegisterPage from "../pages/Authentication/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [{ path: "register", Component: RegisterPage }],
  },
]);
