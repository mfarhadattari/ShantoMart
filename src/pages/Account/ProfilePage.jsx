import PageTitle from "../../components/PageTitle";
import SectionHeading from "../../components/SectionHeading";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
  const { authUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelUpdate = (data) => {
    const { displayName, phoneNumber, photoURL, location, city } = data;
    const userInfo = {
      displayName,
      photoURL,
      phoneNumber: `+880${phoneNumber}`,
      location,
      city,
    };
    console.log(userInfo);

    // axiosPublic.post("/create-account", userInfo).then(({ data }) => {
    //   if (data.alreadyAccount) {
    //     return toast("Phone number is already used!");
    //   }
    //   if (data.insertedId) {
    //     toast("Successfully register!!");
    //   } else {
    //     toast("Something is wrong! Try again!");
    //   }
    // });
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
        <div className="flex flex-col lg:flex-row p-5 gap-5 my-5">
          <div className="w-full flex flex-col items-center">
            <div className="avatar">
              <div className="w-60 rounded">
                <img src={authUser.photoURL} alt={authUser.displayName} />
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
                  <div className="relative border border-gray-500">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="input rounded-none ps-28 w-full"
                      defaultValue={authUser.phoneNumber.slice(4)}
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
