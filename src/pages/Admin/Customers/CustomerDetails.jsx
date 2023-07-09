import { useQuery } from "react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link, useParams } from "react-router-dom";
import Loaders from "../../../components/Loaders";
import SectionHeading from "../../../components/SectionHeading";

const CustomerDetails = () => {
  const { id } = useParams();

  const { axiosPublic } = useAxiosPublic();
  const { data: customerDetails = [], isLoading } = useQuery({
    queryKey: ["customerDetails", axiosPublic, id],
    queryFn: async () => {
      const res = await axiosPublic.get(`admin/customers/${id}`);
      return await res.data;
    },
  });

  const { customerInfo, cart, ordersInfo } = customerDetails;

  return (
    <main>
      <SectionHeading
        heading="Customer Details"
        subheading="See Customer information!"
      />
      {isLoading || !customerDetails ? (
        <div className="h-[300px]">
          <Loaders />
        </div>
      ) : (
        <>
          <section className="my-5">
            <div className="flex justify-between">
              <div>
                <div className="avatar">
                  <div className="w-32">
                    <img src={customerInfo.photoURL} />
                  </div>
                </div>
                <h1 className="text-2xl font-semibold mt-3">
                  Name: {customerInfo.name}
                </h1>
                <p className="text-xl">Phone: {customerInfo.phoneNumber}</p>
              </div>
              {ordersInfo.length > 0 && (
                <div>
                  <h1 className="text-xl font-bold text-center">
                    Orders Information
                  </h1>
                  <div className="flex justify-between mt-3">
                    <p>Ordered: {ordersInfo.length}</p>
                    <p>
                      Paid:{" "}
                      {ordersInfo.reduce(
                        (totalPayment, order) =>
                          order.totalAmount + totalPayment,
                        0
                      )}
                      &#2547;
                    </p>
                  </div>
                  <div className="mt-5 flex flex-col gap-3 items-center justify-center">
                    {ordersInfo.map((order) => (
                      <div
                        key={order._id}
                        className="font-medium flex items-center gap-3 border p-2"
                      >
                        <p className="text-lg">{order.totalAmount} &#2547;</p>
                        <p className="text-lg uppercase">{order.status}</p>
                        <Link
                          to={`/dashboard/orders/${order._id}`}
                          className="btn btn-sm btn-info text-white rounded-none"
                        >
                          Details
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
          {cart.length > 0 && (
            <section>
              <h1 className="text-3xl font-bold text-center my-5">
                Carts Information
              </h1>
              <div>
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="font-medium flex justify-between items-center border px-10 py-2"
                  >
                    <div className="avatar">
                      <div className="w-20 h-20">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                    <h2 className="uppercase">{item.name}</h2>
                    <p>Price: {item.price} &#2547;</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
};

export default CustomerDetails;
