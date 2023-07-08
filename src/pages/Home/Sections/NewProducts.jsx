import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import SectionHeading from "../../../components/SectionHeading";
import ProductCard from "../../../components/ProductCard";
import Loaders from "../../../components/Loaders";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const NewProducts = () => {
  const { axiosPublic } = useAxiosPublic();
  const { data: newProducts = [], isLoading } = useQuery({
    queryKey: ["newProducts", axiosPublic],
    queryFn: async () => {
      const res = await axiosPublic.get("/new-products");
      return res.data;
    },
  });
  return (
    <section className="mt-20">
      <SectionHeading
        heading="Our New Products"
        subheading="Recently added products!"
      />
      {isLoading ? (
        <div className="h-[300px] flex justify-center items-center">
          <Loaders />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-5 p-5">
          {newProducts.map((product) => (
            <ProductCard key={product._id} productInfo={product} />
          ))}
        </div>
      )}
      <div className="flex justify-center my-5">
        <Link to="/products" className="btn rounded-none w-[250px]">
          See More
        </Link>
      </div>
    </section>
  );
};

export default NewProducts;
