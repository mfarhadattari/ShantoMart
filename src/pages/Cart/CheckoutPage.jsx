import Cover from "../../components/Cover";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import banner from "../../assets/Banners/banner2.jpg";
import Loaders from "../../components/Loaders";
import { useState } from "react";
import { generateTransitionId } from "../../utils/utils";
import moment from "moment";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { axiosPublic } = useAxiosPublic();
  const { authUser } = useAuth();
  const [transactionID, setTransactionID] = useState();
  const navigate = useNavigate();

  const { data: carts = [], isLoading } = useQuery({
    queryKey: ["carts", axiosPublic, authUser],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `my-cart?phoneNumber=${authUser.phoneNumber}`
      );
      return await res.data;
    },
  });

  const getTransactionID = () => {
    const id = generateTransitionId();
    setTransactionID(id);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const totalAmount = form.totalAmount.value;
    const userName = form.userName.value;
    const userPhone = form.userPhone.value;
    const city = form.city.value;
    const location = form.location.value;
    const transactionID = form.transactionID.value;
    const status = "pending";
    const paymentTime = moment().format("YYYY-MM-DD:HH-mm-ss");
    const products = carts.map((cart) => ({
      cartID: cart._id,
      image: cart.image,
      name: cart.name,
      price: cart.price,
      quantity: cart.quantity,
    }));

    const orderInfo = {
      userName,
      userPhone,
      totalAmount,
      transactionID,
      paymentTime,
      products,
      status,
      city,
      location,
    };

    axiosPublic.post("/place-order", orderInfo).then(({ data }) => {
      if (data.deletedCount > 0) {
        toast("Order placed successfully!");
        navigate("/");
      }
    });
  };

  return (
    <main>
      <Cover
        heading="Checkout"
        backgroundURL={banner}
        subheading="Checkout you order!"
      />
      {isLoading || !carts ? (
        <div className="h-[300px] flex justify-center items-center">
          <Loaders />
        </div>
      ) : (
        <section className="my-10">
          <div className="flex mt-5 items-center justify-center">
            {/*--------------------  Checkout Form ----------------------- */}
            <div className="card w-full md:w-1/2 mx-auto">
              <h1 className="text-2xl text-center">Checkout Form</h1>
              <form
                className="card-body w-full mx-auto"
                onSubmit={handelSubmit}
              >
                <div className="flex flex-col md:flex-row w-full gap-2 ">
                  <div className="form-control w-full">
                    <input
                      type="text"
                      name="userName"
                      defaultValue={authUser.displayName}
                      disabled
                      className="input input-bordered rounded-none"
                    />
                  </div>
                  <div className="form-control w-full">
                    <input
                      type="text"
                      name="userPhone"
                      defaultValue={authUser.phoneNumber}
                      disabled
                      className="input input-bordered rounded-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-2 ">
                  <div className="form-control w-full">
                    <input
                      type="text"
                      name="city"
                      placeholder="Your City"
                      required
                      className="input input-bordered rounded-none"
                    />
                  </div>
                  <div className="form-control w-full relative">
                    <input
                      type="text"
                      name="totalAmount"
                      defaultValue={carts.reduce(
                        (totalAmount, cart) => cart.price + totalAmount,
                        0
                      )}
                      disabled
                      className="input input-bordered rounded-none"
                    />
                    <p className="h-full absolute top-0 right-0 flex items-center px-5 text-xl">
                      &#2547;
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-2 ">
                  <div className="form-control w-full">
                    <input
                      type="text"
                      name="paymentBy"
                      placeholder="Payment By"
                      required
                      className="input input-bordered rounded-none"
                    />
                  </div>
                  <div className="form-control w-full relative">
                    <input
                      type="text"
                      defaultValue={transactionID}
                      placeholder="Transaction ID"
                      name="transactionID"
                      required
                      className="input input-bordered rounded-none"
                    />
                    <button
                      onClick={getTransactionID}
                      type="button"
                      className="h-full absolute w-fit top-0 right-0 flex items-center px-5 text-xl"
                    >
                      Get ID
                    </button>
                  </div>
                </div>
                <div className="form-control w-full">
                  <textarea
                    name="location"
                    placeholder="Your Address"
                    rows={2}
                    required
                    className="textarea textarea-bordered rounded-none"
                  ></textarea>
                </div>
                <div className="form-control w-full">
                  <button
                    type="submit"
                    className="btn btn-accent rounded-none text-white"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default CheckoutPage;
