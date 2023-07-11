import PageTitle from "../../components/PageTitle";
import SectionHeading from "../../components/SectionHeading";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { FaGear } from "react-icons/fa6";
import { useState } from "react";

const ProfilePage = () => {
  const { authUser } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const [displaySetting, setDisplaySetting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // !UPDATE USER INFO
  const handelUpdate = (data) => {
    const { displayName, photoURL, location, city } = data;
    const userInfo = {
      displayName,
      photoURL,
      location,
      city,
    };

    Swal.fire({
      title: "Verify It's you",
      input: "password",
      inputPlaceholder: "Confirm Password",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        axiosSecure
          .post("/verify-user", {
            phoneNumber: authUser.phoneNumber,
            password: result.value,
          })
          .then(({ data }) => {
            if (data.verified) {
              axiosSecure
                .patch("/update-profile", { userInfo })
                .then(({ data }) => {
                  if (data.modifiedCount > 0) {
                    toast.success("Updated Successfully!");
                  } else {
                    toast.error("Something is wrong!", {
                      style: { color: "red" },
                    });
                  }
                });
            } else {
              return toast.error(data?.message || "Something is wrong!", {
                style: { color: "red" },
              });
            }
          });
      } else {
        return toast.error("Please Input Password!", {
          style: { color: "red" },
        });
      }
    });
  };

  return (
    <main>
      <PageTitle title="Profile | ShantoMart" />
      <SectionHeading
        heading="Profile Review!"
        subheading="See & Update you profile"
      />
      <section className="mx-auto">
        <h1 className="text-3xl text-center font-bold"></h1>
        <div className="flex flex-col lg:flex-row items-center p-5 gap-5 my-5">
          <div className="w-full flex flex-col items-center md:flex-row lg:flex-row-reverse justify-evenly md:items-start">
            <div className="avatar">
              <div className="w-60 rounded">
                <img src={authUser.photoURL} alt={authUser.displayName} />
              </div>
            </div>
            <div className="mt-5">
              <h1
                className="flex items-center text-xl font-bold gap-3"
                onClick={() => setDisplaySetting((pre) => !pre)}
              >
                <FaGear />
                User Setting
              </h1>
              <div
                className={`${
                  displaySetting ? "flex" : "hidden"
                } md:flex flex-col items-start mt-2`}
              >
                <button className="btn btn-sm btn-ghost text-blue-500 rounded-none">
                  Update Phone Number
                </button>
                <button className="btn btn-sm btn-ghost text-green-700 rounded-none">
                  Change Password
                </button>
                <button className="btn btn-sm btn-ghost text-red-500 rounded-none">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <form className="mt-5" onSubmit={handleSubmit(handelUpdate)}>
              <div className="flex flex-col md:flex-row md:gap-5">
                {/* -------- Name ------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Name*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input-field"
                    defaultValue={authUser.displayName}
                    {...register("displayName", { required: true })}
                  />
                  {errors.displayName?.type === "required" && (
                    <p className="errorText">Name is required</p>
                  )}
                </div>
                {/* -------- Phone ------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Phone Number*</span>
                  </label>
                  <div
                    className="relative border border-gray-500"
                    title="You can't update phone number!"
                  >
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="input rounded-none ps-28 w-full"
                      defaultValue={authUser.phoneNumber.slice(4)}
                      disabled
                    />
                    <p className="absolute h-full top-0 flex p-2 items-center bg-base-300">
                      (BD) +880
                    </p>
                  </div>
                </div>
              </div>

              {/* ----------Photo URL */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Profile URL*</span>
                </label>
                <input
                  type="url"
                  className="input-field"
                  placeholder="Photo URL"
                  defaultValue={authUser.photoURL}
                  {...register("photoURL", { required: true })}
                />
                {errors.photoURL?.type == "required" && (
                  <p className="errorText">Photo URL is required</p>
                )}
              </div>
              <div className="flex flex-col md:flex-row md:gap-5">
                {/* -------- City ------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    className="input-field"
                    defaultValue={authUser?.city ? authUser.city : "Not Set"}
                    {...register("city")}
                  />
                </div>
                {/* -------- Location ------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Location</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Location"
                    className="input-field"
                    defaultValue={
                      authUser?.location ? authUser.location : "Not Set"
                    }
                    {...register("location")}
                  />
                </div>
              </div>
              <div className="form-control w-full mt-3">
                <button
                  type="submit"
                  className="btn btn-success text-white rounded-none"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
