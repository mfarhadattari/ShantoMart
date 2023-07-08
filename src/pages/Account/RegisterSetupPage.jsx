import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const RegisterSetupPage = () => {
  const { setupProfile } = useAuth();

  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.displayName.value;
    const photoURL = form.photoURL.value;
    setupProfile(displayName, photoURL)
      .then(() => {
        toast("Setup Complete");
        form.reset();
        navigate("/");
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <main>
      <section className="my-10">
        <div className="card w-1/3 mx-auto shadow-2xl bg-base-100">
          <h1 className="text-2xl mt-3 text-center font-medium">
            Setup Profile!
          </h1>
          <form className="card-body w-full" onSubmit={handelSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                required
                name="displayName"
                className="input input-bordered rounded-none"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="url"
                placeholder="PhotoURL"
                required
                name="photoURL"
                className="input input-bordered rounded-none"
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-secondary rounded-none">
                Setup
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default RegisterSetupPage;
