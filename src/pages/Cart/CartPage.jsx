import Cover from "../../components/Cover";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import banner from "../../assets/Banners/banner2.jpg";
import Loaders from "../../components/Loaders";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const { axiosPublic } = useAxiosPublic();
  const { authUser } = useAuth();
  const {
    data: carts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", axiosPublic, authUser],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `my-cart?phoneNumber=${authUser.phoneNumber}`
      );
      return await res.data;
    },
  });

  const handleDelete = (id) => {
    axiosPublic.delete(`/delete-cart/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast("Remove Successfully");
        refetch();
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    axiosPublic
      .patch(`/update-quantity/${id}`, {
        quantity,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
        }
      });
  };

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
                        <button
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                        >
                          <FaMinus />
                        </button>
                        <p className="border p-2 w-16 text-center text-xl">
                          {item.quantity}
                        </p>
                        <button
                          disabled={item.quantity > 20}
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                        >
                          <FaPlus />
                        </button>
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
