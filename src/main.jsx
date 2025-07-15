import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReTitleProvider } from "re-title";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "./global.css";
import { router } from "./Routes/router";
import AuthPrivider from "./store/provider/AuthProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthPrivider>
        <ReTitleProvider defaultTitle="MediMart Hub">
          <ToastContainer autoClose={1500} position="top-left" />
          <RouterProvider router={router} />
        </ReTitleProvider>
      </AuthPrivider>
    </QueryClientProvider>
  </StrictMode>
);
