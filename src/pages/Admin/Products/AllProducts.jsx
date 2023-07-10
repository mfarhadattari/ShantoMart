import { useQuery } from "react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import Loaders from "../../../components/Loaders";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import SectionHeading from "../../../components/SectionHeading";
import PageTitle from "../../../components/PageTitle";

const AllProducts = () => {
  const { axiosPublic } = useAxiosPublic();
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", axiosPublic],
    queryFn: async () => {
      const res = await axiosPublic.get("admin/products");
      return await res.data;
    },
  });

  const deleteProduct = (id) => {
    axiosPublic.delete(`/admin/delete-product/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast("Deleted Successfully");
        refetch();
      }
    });
  };

  return (
    <main>
      <PageTitle title="All Products | ShantoMart"/>
      <SectionHeading
        heading="All Products"
        subheading="Here the all products!"
      />
      <section className="my-10  mx-auto">
        {isLoading || !products ? (
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
                  <th>Stock</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr key={product._id} className="hover:shadow-xl">
                    <th>{idx + 1}</th>
                    <td>
                      <div className="avatar">
                        <div className="w-20 h-20">
                          <img src={product.image} alt={product.name} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <h2 className="uppercase">{product.name}</h2>
                        <p className="text-blue-500">
                          Price: {product.price} &#2547;
                        </p>
                      </div>
                    </td>
                    <td>{product.stock}pes</td>
                    <th>
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/products/${product._id}`}
                          className="btn btn-circle btn-info text-white text-xl"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          to={`/dashboard/products/${product._id}`}
                          className="btn btn-circle btn-accent text-white text-xl"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          className="btn btn-circle btn-error text-white text-xl"
                          onClick={() => deleteProduct(product._id)}
                        >
                          <FaTrashAlt />
                        </button>
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

export default AllProducts;
