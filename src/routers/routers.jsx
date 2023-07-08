import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/Home/HomePage";
import ProductsPage from "../pages/Products/ProductsPage";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
import LoginPage from "../pages/Account/LoginPage";
import PrivateRouter from "./PrivateRouter";
import RegisterPage from "../pages/Account/RegisterPage";
import RegisterSetupPage from "../pages/Account/RegisterSetupPage";
import CartPage from "../pages/Cart/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import AllProducts from "../pages/Admin/Products/AllProducts";
import AddProduct from "../pages/Admin/Products/AddProduct";
import UpdateProduct from "../pages/Admin/Products/UpdateProduct";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/register/set-up",
        element: <RegisterSetupPage />,
      },
      {
        path: "/carts",
        element: (
          <PrivateRouter>
            <CartPage />
          </PrivateRouter>
        ),
      },
      {
        path: "/checkout",
        element: <>Checkout Page</>,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "/admin",
        element: <>Admin Home</>,
      },
      {
        path: "customers",
        element: <>Customer Page</>,
      },
      {
        path: "customers/:id",
        element: <>Customer Details Page</>,
      },
      {
        path: "orders",
        element: <>Orders Page</>,
      },
      {
        path: "orders/:id",
        element: <>Order Details Page</>,
      },
      {
        path: "products",
        element: <AllProducts />,
      },
      {
        path: "products/:id",
        element: <UpdateProduct />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
    ],
  },
  {
    path: "*",
    element: <>Not Found Page</>,
  },
]);

export default routers;
