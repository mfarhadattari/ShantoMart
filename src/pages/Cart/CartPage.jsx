import Cover from "../../components/Cover";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import banner from "../../assets/Banners/banner2.jpg";
import Loaders from "../../components/Loaders";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

const CartPage = () => {
  const { axiosPublic } = useAxiosPublic();
  const { authUser } = useAuth();
  const {
    data: carts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["carts", axiosPublic, authUser],
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
      <PageTitle title="Cart | ShantoMart"/>
      <Cover
        heading="Cart"
        backgroundURL={banner}
        subheading="Your Added Products!"
      />
      {isLoading || !carts ? (
        <div className="h-[300px] flex justify-center items-center">
          <Loaders />
        </div>
      ) : (
        <>
          <section
            className={carts.length > 0 ? "my-10 lg:w-3/4 mx-auto" : "hidden"}
          >
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

            <div className="flex justify-end mt-5">
              <Link
                to="/checkout"
                className="btn w-[200px] rounded-none btn-success text-white"
              >
                Checkout
              </Link>
            </div>
          </section>
          <section
            className={
              carts.length > 0
                ? "hidden"
                : "my-10 h-[300px] flex justify-center items-center"
            }
          >
            <div className="text-3xl text-center">
              <h1> No Cart Data</h1>
              <Link to="/products" className="btn btn-sm mt-5">
                See Product
              </Link>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default CartPage;
