import Cover from "../../components/Cover";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import banner from "../../assets/Banners/banner2.jpg";
import Loaders from "../../components/Loaders";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";

const CartPage = () => {
  const { axiosPublic } = useAxiosPublic();
  const { authUser } = useAuth();
  const { data: carts = [], isLoading } = useQuery({
    queryKey: ["product", axiosPublic, authUser],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `my-cart?phoneNumber=${authUser.phoneNumber}`
      );
      return await res.data;
    },
  });

  const handleDelete = (id) => {};
  return (
    <main>
      <Cover
        heading="Cart"
        backgroundURL={banner}
        subheading="Your Added Products!"
      />
      <section className="my-10 lg:w-3/4 mx-auto">
        {isLoading || !carts ? (
          <div className="h-[300px] flex justify-center items-center">
            <Loaders />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Name & Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((item, idx) => (
                  <tr key={item._id} className="hover:shadow-xl">
                    <th>{idx + 1}</th>
                    <td>
                      <div className="avatar">
                        <div className="w-20 h-20">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <h2 className="uppercase">{item.name}</h2>
                        <p className="text-blue-500">
                          Price: {item.price} &#2547;
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {/* <FaMinus /> */}
                        <input
                          type="number"
                          className="border p-2 text-xl w-16 m-0 text-center"
                          value={item.quantity}
                          //   max={20}
                          //   min={1}
                        />
                        {/* <FaPlus /> */}
                      </div>
                    </td>
                    <th>
                      <button
                        className="btn btn-circle"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FaTrashAlt />
                      </button>
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

export default CartPage;
