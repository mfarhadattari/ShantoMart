
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  


  const authInfo = { authUser, authLoading, };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
