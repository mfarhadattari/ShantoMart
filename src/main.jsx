import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@smastrom/react-rating/style.css";
import { RouterProvider } from "react-router-dom";
import routers from "./routers/routers.jsx";
import QueryProvider from "./provider/QueryProvider";
import AuthProvider from "./provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryProvider>
          <div className="max-w-7xl mx-auto font-space-grotesk">
            <RouterProvider router={routers}></RouterProvider>
            <Toaster />
          </div>
        </QueryProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
