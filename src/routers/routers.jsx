import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/Home/HomePage";
import ProductsPage from "../pages/Products/ProductsPage";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
import LoginPage from "../pages/Account/LoginPage";
import RegisterPage from "../pages/Account/RegisterPage";
import CartPage from "../pages/Cart/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import AllProducts from "../pages/Admin/Products/AllProducts";
import AddProduct from "../pages/Admin/Products/AddProduct";
import UpdateProduct from "../pages/Admin/Products/UpdateProduct";
import CustomersPage from "../pages/Admin/Customers/CustomersPage";
import OrdersPage from "../pages/Admin/Orders/OrdersPage";
import OrdersDetails from "../pages/Admin/Orders/OrdersDetails";
import CustomerDetails from "../pages/Admin/Customers/CustomerDetails";
import AddCustomer from "../pages/Admin/Customers/AddCustomer";
import AdminHome from "../pages/Admin/AdminHome/AdminHome";
import CheckoutPage from "../pages/Cart/CheckoutPage";

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
        path: "/carts",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminHome />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "customers/:id",
        element: <CustomerDetails />,
      },
      {
        path: "add-customer",
        element: <AddCustomer />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "orders/:id",
        element: <OrdersDetails />,
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
