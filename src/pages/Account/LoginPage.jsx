import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const { axiosPublic } = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handelLogin = (data) => {
    const { phoneNumber, password } = data;
    const userInfo = {
      password,
      phoneNumber: `+880${phoneNumber}`,
    };

    axiosPublic.post("/login", userInfo).then(({ data }) => {
      if (data.token) {
        localStorage.setItem("ShantoMartAuthToken", data.token);
        toast("Successfully Login");
        reset();
        return navigate("/");
      }
      if (data.error) {
        return toast(errors.message);
      } else {
        toast("Something is wrong! Try again!");
      }
    });
  };

  return (
    <main>
      <section>
        <div className="p-5 w-full md:w-2/3 lg:w-2/6 mx-auto">
          <h1 className="text-3xl text-center font-bold">Login now!</h1>
          <form className="mt-5" onSubmit={handleSubmit(handelLogin)}>
            {/* -------- Phone ------------- */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <div className="relative border border-gray-500">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input rounded-none ps-28 w-full"
                  {...register("phoneNumber", {
                    required: true,
                    pattern: /^\d+$/,
                    maxLength: 10,
                    minLength: 10,
                  })}
                />
                <p className="absolute h-full top-0 flex p-2 items-center bg-base-300">
                  (BD) +880
                </p>
              </div>
              {errors.phoneNumber?.type == "required" && (
                <p className="errorText">Phone number is required</p>
              )}
              {errors.phoneNumber?.type == "pattern" && (
                <p className="errorText">Phone number is must number</p>
              )}
              {(errors.phoneNumber?.type == "minLength" ||
                errors.phoneNumber?.type == "maxLength") && (
                <p className="errorText">Phone number must 10 number</p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={passwordShow ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="input input-bordered border-gray-500  rounded-none w-full"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 20,
                    pattern:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
                  })}
                />
                <button
                  type="button"
                  className="absolute top-4 right-3 text-xl"
                  onClick={() => setPasswordShow(!passwordShow)}
                >
                  {passwordShow ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <p className="errorText">Password is Required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="errorText">Password must be 8 character</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="errorText">Password less then 20 character</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="errorText">
                  Minimum one uppercase, one lowercase, one number and one
                  special character
                </p>
              )}
            </div>
            <div className="form-control w-full mt-3">
              <button className="btn btn-accent text-white rounded-none">
                Login
              </button>
            </div>
            <p className="my-3 text-base text-center">
              New to ShantoMart?{" "}
              <Link to="/register" className="link link-hover text-blue-600">
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
