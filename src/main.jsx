import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import '@smastrom/react-rating/style.css'
import { RouterProvider } from "react-router-dom";
import routers from "./routers/routers.jsx";
import QueryProvider from "./provider/QueryProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryProvider>
      <div className="max-w-7xl mx-auto font-space-grotesk">
        <RouterProvider router={routers}></RouterProvider>
      </div>
    </QueryProvider>
  </React.StrictMode>
);
