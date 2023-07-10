import { useQuery } from "react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loaders from "../../../components/Loaders";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionHeading from "../../../components/SectionHeading";
import PageTitle from './../../../components/PageTitle';

const CustomersPage = () => {
  const { axiosPublic } = useAxiosPublic();
  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["customers", axiosPublic],
    queryFn: async () => {
      const res = await axiosPublic.get("admin/customers");
      return await res.data;
    },
  });
  return (
    <main>
      <PageTitle title="Customers | ShantoMart"/>
      <SectionHeading heading="Customer" subheading="Who are using this services!"/>
      <section className="my-10  mx-auto">
        {isLoading || !customers ? (
          <div className="h-[300px] flex justify-center items-center">
            <Loaders />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, idx) => (
                  <tr key={customer._id} className="hover:shadow-xl h-full">
                    <th>{idx + 1}</th>
                    <td>
                      <div className="avatar">
                        <div className="w-20 h-20">
                          <img src={customer.photoURL} alt={customer.name} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <h2 className="text-xl font-semibold">{customer.name}</h2>
                    </td>
                    <td>
                      <h2 className="text-xl">{customer.phoneNumber}</h2>
                    </td>
                    <th className="text-center">
                      <Link
                        to={`/dashboard/customers/${customer._id}`}
                        className="btn btn-circle btn-success text-white text-xl"
                      >
                        <FaEye></FaEye>
                      </Link>
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

export default CustomersPage;
