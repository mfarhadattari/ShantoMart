import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { axiosPublic } = useAxiosPublic();

  useEffect(() => {
    const token = localStorage.getItem("ShantoMartAuthToken");
    if (token) {
      axiosPublic("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(({ data }) => {
        setAuthUser(data);
        setAuthLoading(false);
      });
    }
  });

  const authInfo = { authUser, authLoading };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
