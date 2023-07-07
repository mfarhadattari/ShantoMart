import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <div>
        <nav>Navigation Bar</nav>
        <Outlet></Outlet>
      </div>
      <footer>Footer</footer>
    </div>
  );
};

export default MainLayout;
