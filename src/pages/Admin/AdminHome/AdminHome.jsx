import {
  FaShippingFast,
  FaShoppingCart,
  FaSlack,
  FaUser,
} from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loaders from "../../../components/Loaders";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionHeading from "../../../components/SectionHeading";
import PageTitle from './../../../components/PageTitle';

const AdminHome = () => {
  const { axiosPublic } = useAxiosPublic();

  const { data: overviews = {}, isLoading } = useQuery({
    queryKey: ["overviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/admin/overviews");
      return res.data;
    },
  });
  
  return (
    <main>
      <PageTitle title="Admin Home | ShantoMart"/>
      <SectionHeading
        heading="Admin Home"
        subheading="Overview of Information!"
      />
      {isLoading || !overviews ? (
        <div className="h-[300px] flex justify-center items-center">
          <Loaders />
        </div>
      ) : (
        <section className="w-full mx-auto space-y-3 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-between items-center gap-3">
            <Link
              to="/dashboard/products"
              className="w-full border p-5 flex justify-between"
            >
              <div className="flex flex-col">
                <p className="text-xl">Total Product</p>
                <p className="text-primary text-5xl">
                  {overviews.totalProduct || 0}
                </p>
              </div>
              <div className="text-primary text-7xl">
                <FaSlack />
              </div>
            </Link>
            <Link
              to="/dashboard/customers"
              className="w-full border p-5 flex justify-between"
            >
              <div className="flex flex-col">
                <p className="text-xl">Total Customer</p>
                <p className="text-secondary text-5xl">
                  {overviews.totalCustomer || 0}
                </p>
              </div>
              <div className="text-secondary text-7xl">
                <FaUser />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-between items-center gap-3">
            <Link
              to="/dashboard/orders"
              className="w-full border p-5 flex justify-between"
            >
              <div className="flex flex-col">
                <p className="text-xl">Total Orders</p>
                <p className="text-success text-5xl">
                  {overviews.totalOrder || 0}
                </p>
              </div>
              <div className="text-success text-7xl">
                <FaShippingFast />
              </div>
            </Link>
            <div className="w-full border p-5 flex justify-between">
              <div className="flex flex-col">
                <p className="text-xl">Total Carts</p>
                <p className="text-info text-5xl">{overviews.totalCart || 0}</p>
              </div>
              <div className="text-info text-7xl">
                <FaShoppingCart />
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default AdminHome;
