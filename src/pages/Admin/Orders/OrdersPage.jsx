import { useQuery } from "react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loaders from "../../../components/Loaders";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import SectionHeading from "../../../components/SectionHeading";
import PageTitle from "../../../components/PageTitle";

const OrdersPage = () => {
  const { axiosPublic } = useAxiosPublic();
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", axiosPublic],
    queryFn: async () => {
      const res = await axiosPublic.get("admin/orders");
      return await res.data;
    },
  });

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
    <main>
      <PageTitle title="Orders | ShantoMart"/>
      <SectionHeading
        heading="User Orders"
        subheading="Review the Orders!"
      />
      <section className="my-10  mx-auto">
        {isLoading || !orders ? (
          <div className="h-[300px] flex justify-center items-center">
            <Loaders />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Info</th>
                  <th>Product Info</th>
                  <th>Payment Info</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order._id} className="hover:shadow-xl">
                    <th>{idx + 1}</th>
                    <td>
                      <div className="font-medium text-base w-fit">
                        <h1>{order.userName}</h1>
                        <p>{order.userPhone}</p>
                        <p>{order.city}</p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p>
                          Products:{" "}
                          {order.products.reduce(
                            (totalQuantity, product) =>
                              totalQuantity + product.quantity,
                            0
                          )}
                          pes
                        </p>
                        <p className="text-blue-500">
                          Price: {order.totalAmount} &#2547;
                        </p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p>TransID: {order.transactionID}</p>
                        <p>Method: {order.paymentBy}</p>
                        <p>Date: {order.paymentTime?.split(":")[0]}</p>
                        <p>Time: {order.paymentTime?.split(":")[1].split("-").join(":")}</p>
                      </div>
                    </td>
                    <th>
                      <div className="flex flex-col justify-center items-center gap-2 w-[100px] mx-auto">
                        <p className="uppercase text-blue-500 text-center w-full">
                          {order.status}
                        </p>
                        {order.status == "pending" && (
                          <button
                            className="btn btn-sm rounded-none btn-success w-full text-white"
                            onClick={() => handelApprove(order._id)}
                          >
                            Approve
                          </button>
                        )}
                        {/* TODO: Implement Canceling and deleting*/}
                        {/* {order.status == "cancel" && (
                          <button className="btn btn-sm rounded-none btn-error w-full text-white">
                            Delete
                          </button>
                        )} */}
                        <Link
                          to={`/dashboard/orders/${order._id}`}
                          className="btn btn-sm btn-info text-white rounded-none w-full"
                        >
                          Details
                        </Link>
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default OrdersPage;
