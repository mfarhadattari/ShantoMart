import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Loaders from "../../../components/Loaders";
import SectionHeading from "./../../../components/SectionHeading";
import { toast } from "react-hot-toast";
import PageTitle from './../../../components/PageTitle';

const OrdersDetails = () => {
  const { id } = useParams();
  const { axiosPublic } = useAxiosPublic();
  const {
    data: order = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["order", axiosPublic, id],
    queryFn: async () => {
      const res = await axiosPublic.get(`admin/orders/${id}`);
      return await res.data;
    },
  });

  const {
    _id,
    userName,
    userPhone,
    totalAmount,
    transactionID,
    paymentTime,
    status,
    paymentBy,
    products,
    city,
    location,
  } = order;

  const handelApprove = (id) => {
    axiosPublic
      .patch(`admin/update-status/${id}`, {
        status: "approve",
      })
      .then(({ data }) => {
        if (data.modifiedCount > 0) {
          toast("Approve Successfully!");
          refetch();
        }
      });
  };

  return (
    <main className="p-5 lg:px-10">
      <PageTitle title="Order Details | ShantoMart"/>
      <SectionHeading heading="Order Details" subheading="Review Order" />
      {isLoading || !order ? (
        <div>
          <Loaders />
        </div>
      ) : (
        <>
          <section className="my-5">
            <div className="flex flex-col md:flex-row gap-5 justify-between">
              <div>
                <h1 className="text-xl font-semibold">Customer: {userName}</h1>
                <p>Contract: {userPhone}</p>
                <p>City: {city}</p>
                <p>Location: {location}</p>
                <p>Amount: {totalAmount} &#2547;</p>
              </div>
              <div>
                <p>TransID: {transactionID}</p>
                <p>Method: {paymentBy}</p>
                <p>Pay Date: {paymentTime?.split(":")[0]}</p>
                <p>
                  Pay Time: {paymentTime?.split(":")[1].split("-").join(":")}
                </p>
                <p>
                  Status: <span className="uppercase">{status}</span>
                </p>
              </div>
            </div>
          </section>
          <section>
            <h1 className="text-3xl font-bold text-center my-5">Products</h1>
            <div className="overflow-x-auto">
              <table className="table border">
                <tbody>
                  {products.map((product, idx) => (
                    <tr key={idx} className="font-medium">
                      <th>{idx + 1}</th>
                      <td>
                        <div className="avatar">
                          <div className="w-20 h-20">
                            <img src={product.image} alt={product.name} />
                          </div>
                        </div>
                      </td>
                      <td>
                        <h2 className="uppercase">{product.name}</h2>
                      </td>
                      <td className="text-lg w-fit">
                        <div className="w-20">
                          <p> {product.price} &#2547;</p>
                          <p>{product.quantity}pes</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {order.status == "pending" && (
              <button
                className="btn btn-sm rounded-none btn-success w-full mt-5 text-white"
                onClick={() => handelApprove(_id)}
              >
                Approve
              </button>
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default OrdersDetails;
