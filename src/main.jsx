import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "./global.css";
import { router } from "./Routes/router";
import AuthPrivider from "./store/provider/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthPrivider>
      <ToastContainer autoClose={1500} position="top-left" />
      <RouterProvider router={router} />
    </AuthPrivider>
  </StrictMode>
);
