import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";

export const AuthContext = createContext();
const auth = firebase.auth();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setAuthUser(currentUser);
    });

    return () => unsubscribe();
  });
  const authInfo = {authUser, auth};
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
