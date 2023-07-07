import Cover from "../../components/Cover";
import banner from "../../assets/Banners/banner1.jpg";

const ProductsPage = () => {
  return (
    <main>
      <Cover
        heading="Discover Our Products"
        subheading="Get your favorite products"
        backgroundURL={banner}
      />
    </main>
  );
};

export default ProductsPage;
