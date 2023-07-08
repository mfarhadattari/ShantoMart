import { useEffect } from "react";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebaseConfig from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const RegisterPage = () => {
  const auth = firebase.auth();

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start(".phone-auth-container", {
      signInSuccessUrl: "/register/set-up",
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: "BD",
        },
      ],
    });
  }, [auth]);
  return (
    <main>
      <section className="my-10">
        <div className="phone-auth-container"></div>
        <p className="text-center my-5">
          Already an account?
          <Link to="/login" className="link link-hover ms-1">
            Login now
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
