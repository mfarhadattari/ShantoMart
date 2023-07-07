import { Outlet } from "react-router-dom";
import NavigationBar from "../pages/Shared/NavigationBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <div>
        <NavigationBar></NavigationBar>
        <Outlet></Outlet>
      </div>
      <footer>Footer</footer>
    </div>
  );
};

export default MainLayout;
