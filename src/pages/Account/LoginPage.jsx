import { useEffect } from "react";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebaseConfig from "../../firebase/firebase.config";
import { useLocation } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const LoginPage = () => {
  const auth = firebase.auth();
  const location = useLocation();
  const redirect = location?.state?.from || "/";

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start(".phone-auth-container", {
      signInSuccessUrl: redirect,
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: "BD",
        },
      ],
    });
  }, [auth, redirect]);
  return <div className="phone-auth-container my-10"></div>;
};

export default LoginPage;
