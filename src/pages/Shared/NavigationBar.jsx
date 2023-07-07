import { Link } from "react-router-dom";
import NavLink from "../../components/NavLink";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

const navOptions = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/products",
    name: "Products",
  },
  {
    path: "/login",
    name: "Login",
  },
  {
    path: "/carts",
    name: "Carts",
  },
];

const NavigationBar = () => {
  return (
    <nav className="navbar p-5 md:px-20 items-center sticky top-0 z-50 ">
      <div className="navbar-start">
        {/* --------- Mobile and Tab Navigation  */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost text-3xl lg:hidden">
            <FaBars></FaBars>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
          >
            {navOptions.map((option) => (
              <NavLink key={option.path} to={option.path}>
                {option.name}
              </NavLink>
            ))}
          </ul>
        </div>
        {/* ----------- Title and Logo ---------- */}
        <Link to="/" className="text-3xl font-semibold">
          ShantoMart
        </Link>
      </div>
      {/* -------------------- Desktop Navbar --------- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navOptions.map((option) => (
            <NavLink key={option.path} to={option.path}>
              {option.name}
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        {/* -------------------- Admin Dashboard ------------- */}
        <NavLink to="/admin">
          <label className="btn btn-ghost btn-circle">
            <div className="text-xl flex justify-center items-center w-full h-full">
              <FaGear></FaGear>
            </div>
          </label>
        </NavLink>

        {/* ----------------- Avatar ---------- */}
        <div className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full avatar">
            <span className="text-4xl flex justify-center items-center w-full h-full">
              <FaUserCircle></FaUserCircle>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
