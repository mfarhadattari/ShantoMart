import { useState } from "react";
import NavigationBar from "../pages/Shared/NavigationBar";
import NavLink from "../components/NavLink";
import { FaGear, FaXmark } from "react-icons/fa6";
import { Outlet } from "react-router-dom";

const options = [
  {
    path: "/admin",
    name: "Admin Home",
  },
  {
    path: "/admin/products",
    name: "Products",
  },
  {
    path: "/admin/add-product",
    name: "Add Product",
  },
  {
    path: "/admin/customers",
    name: "Customers",
  },
  {
    path: "/admin/orders",
    name: "Orders",
  },
];

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar></NavigationBar>
      <div className="h-full w-full flex">
        <div className="w-1/4 hidden lg:block">
          <ul className="menu px-1">
            {options.map((option) => (
              <NavLink key={option.path} to={option.path}>
                {option.name}
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-3/4 relative">
          <ul
            className={`menu bg-slate-950 text-white lg:hidden w-[200px] absolute ${
              isOpen ? "top-0 right-0" : "hidden"
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
            className="lg:hidden absolute top-5 right-5 text-3xl btn btn-circle"
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
