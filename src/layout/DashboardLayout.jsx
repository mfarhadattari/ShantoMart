import { useState } from "react";
import NavigationBar from "../pages/Shared/NavigationBar";
import NavLink from "../components/NavLink";
import { FaGear, FaXmark } from "react-icons/fa6";
import { Outlet } from "react-router-dom";

const options = [
  {
    path: "/dashboard",
    name: "Admin Home",
  },
  {
    path: "/dashboard/products",
    name: "Products",
  },
  {
    path: "/dashboard/add-product",
    name: "Add Product",
  },
  {
    path: "/dashboard/customers",
    name: "Customers",
  },
  {
    path: "/dashboard/add-customer",
    name: "Add Customer",
  },
  {
    path: "/dashboard/orders",
    name: "Orders",
  },
];

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col max-w-7xl">
      <NavigationBar></NavigationBar>
      <div className="h-full w-full flex">
        <div className="w-1/4 hidden lg:block">
          <ul className="menu px-1 fixed">
            {options.map((option) => (
              <NavLink key={option.path} to={option.path}>
                {option.name}
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-3/4 relative">
          <ul
            className={`menu bg-white fixed lg:hidden w-[200px]  z-40 ${
              isOpen ? "top-20 right-0" : "hidden"
            }`}
          >
            {options.map((option) => (
              <NavLink key={option.path} to={option.path}>
                {option.name}
              </NavLink>
            ))}
          </ul>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden fixed top-20 right-3 text-3xl btn btn-circle z-50"
          >
            <span className="animate-spin">
              {isOpen ? <FaXmark></FaXmark> : <FaGear></FaGear>}
            </span>
          </button>
          <div className="mt-10 lg:mt-0">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
