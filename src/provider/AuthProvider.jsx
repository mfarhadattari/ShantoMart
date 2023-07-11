import { createContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { axiosSecure } = useAxiosSecure();

  // ! logged user
  const logout = () => {
    localStorage.removeItem("ShantoMartAuthToken");
    setAuthUser(null);
    setAuthLoading(false);
  };

  // !Get Logged user
  useEffect(() => {
    axiosSecure("/user").then(({ data }) => {
      if (data.user) {
        setAuthUser(data.user);
        setAuthLoading(false);
      } else {
        setAuthUser(null);
        setAuthLoading(false);
      }
    });
  }, [axiosSecure]);

  const authInfo = { authUser, authLoading, logout, setAuthUser };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
