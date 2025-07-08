import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./global.css";
import { router } from "./Routes/router";
import AuthPrivider from "./store/provider/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthPrivider>
      <RouterProvider router={router} />
    </AuthPrivider>
  </StrictMode>
);
