import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { axiosPublic } = useAxiosPublic();

  // ! logged user
  const logout = () => {
    localStorage.removeItem("ShantoMartAuthToken");
    setAuthUser(null);
    setAuthLoading(false);
  };


  // ! Set user

  // !Get Logged user
  useEffect(() => {
    const token = localStorage.getItem("ShantoMartAuthToken");
    axiosPublic("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      if (data.user) {
        setAuthUser(data.user);
        setAuthLoading(false);
      } else {
        setAuthUser(null);
        setAuthLoading(false);
      }
    });
  }, [axiosPublic]);

  const authInfo = { authUser, authLoading, logout, setAuthUser };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
