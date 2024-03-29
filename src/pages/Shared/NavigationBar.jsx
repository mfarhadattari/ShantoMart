import { Link } from "react-router-dom";
import NavLink from "../../components/NavLink";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";

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
  const { authUser, logout } = useAuth();
  const handelLogOut = () => {
    logout();
  };
  return (
    <nav className="navbar p-5 md:px-20 bg-white items-center sticky top-0 z-50 ">
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
        {authUser && (
          <NavLink to="/dashboard">
            <label className="btn btn-ghost btn-circle">
              <div className="text-xl flex justify-center items-center w-full h-full">
                <FaGear></FaGear>
              </div>
            </label>
          </NavLink>
        )}

        {/* ----------------- Avatar ---------- */}
        {authUser && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {authUser?.photoURL ? (
                  <img src={authUser?.photoURL} />
                ) : (
                  <span className="text-4xl flex justify-center items-center w-full h-full">
                    <FaUserCircle></FaUserCircle>
                  </span>
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] bg-white p-2 shadow rounded-box w-52"
            >
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/orders">Orders</NavLink>
              <button className="btn btn-sm mt-3 w-fit" onClick={handelLogOut}>
                Log Out
              </button>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
