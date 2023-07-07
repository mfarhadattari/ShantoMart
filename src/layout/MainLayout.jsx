import { Outlet } from "react-router-dom";
import NavigationBar from "../pages/Shared/NavigationBar";
import Footer from "../pages/Shared/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <div>
        <NavigationBar></NavigationBar>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
