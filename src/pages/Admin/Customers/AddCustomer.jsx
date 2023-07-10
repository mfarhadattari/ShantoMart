import { useForm } from "react-hook-form";
import SectionHeading from "./../../../components/SectionHeading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-hot-toast";
const AddCustomer = () => {
  const { axiosPublic } = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, phoneNumber, photoURL } = data;
    axiosPublic
      .post("/admin/add-customer", {
        name,
        phoneNumber: `+880${phoneNumber}`,
        photoURL,
      })
      .then(({ data }) => {
        if (data.insertedId) {
          toast("Customer Added!");
          reset();
          return;
        }
        if (data.alreadyExist) {
          toast("This number is already used!");
          return;
        }
      });
  };

  return (
    <main>
      <SectionHeading
        heading="Add Customer"
        subheading="Give necessary information!"
      />
      <section className="my-10">
        <div className="card md:w-1/2 mx-auto">
          <form className="card-body w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control ">
              <input
                type="text"
                placeholder="Name"
                className="input-field"
                {...register("name", { required: true })}
              />
              {errors.name?.type == "required" && (
                <p className="errorText">Name is required</p>
              )}
            </div>
            <div className="form-control">
              <div className="relative border border-gray-500">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input input-bordered rounded-none  ps-28 w-full"
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
                <p className="errorText">Phone number must 10 character</p>
              )}
            </div>
            <div className="form-control">
              <input
                type="url"
                placeholder="PhotoURL"
                className="input-field"
                {...register("photoURL", { required: true })}
              />
              {errors.photoURL?.type == "required" && (
                <p className="errorText">Photo URL is required</p>
              )}
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-success text-white rounded-none"
              >
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AddCustomer;
