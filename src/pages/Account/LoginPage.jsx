import { useEffect } from "react";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebaseConfig from "../../firebase/firebase.config";
import { Link, useLocation } from "react-router-dom";

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
  return (
    <main>
      <section className="my-10">
        <div className="phone-auth-container"></div>
        <p className="text-center my-5">
          New to ShantoMart?
          <Link to="/register" className="link link-hover ms-1">
            Register now
          </Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;