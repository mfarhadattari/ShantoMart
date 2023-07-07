import Cover from "../../components/Cover";
import banner from "../../assets/Banners/banner1.jpg";
import { useQuery } from "react-query";
import Loaders from "../../components/Loaders";
import ProductCard from "../../components/ProductCard";

const ProductsPage = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/data/products.json");
      return await res.json();
    },
  });

  return (
    <main>
      <Cover
        heading="Discover Our Products"
        subheading="Get your favorite products"
        backgroundURL={banner}
      />
      <section>
        {isLoading ? (
          <div className="h-[300px]">
            <Loaders />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 gap-5 p-5">
            {products.map((product) => (
              <ProductCard key={product._id} productInfo={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ProductsPage;
