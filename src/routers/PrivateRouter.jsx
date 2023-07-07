import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loaders from "../components/Loaders";

const PrivateRouter = ({ children }) => {
  const { authUser, authLoading } = useAuth();
  const location = useLocation();
  if (authLoading && !authUser) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Loaders></Loaders>
      </div>
    );
  }
  if (authUser) {
    return children;
  } else {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
};

export default PrivateRouter;
