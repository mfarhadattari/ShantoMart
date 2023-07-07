import { useEffect } from "react";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebaseConfig from "../../firebase/firebase.config";

firebase.initializeApp(firebaseConfig);

const LoginPage = () => {
  const auth = firebase.auth();

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start(".phone-auth-container", {
      signInSuccessUrl: "/",
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: "BD",
        },
      ],
    });
  });
  return <div className="phone-auth-container my-10"></div>;
};

export default LoginPage;
