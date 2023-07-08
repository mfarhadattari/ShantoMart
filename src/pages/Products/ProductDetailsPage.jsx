import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loaders from "../../components/Loaders";
import { Rating } from "@smastrom/react-rating";
import AddToCartBtn from "../../components/AddToCartBtn";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { axiosPublic } = useAxiosPublic();
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", axiosPublic, id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${id}`);
      return await res.data;
    },
  });

  return (
    <main>
      {isLoading || !product ? (
        <div>
          <Loaders />
        </div>
      ) : (
        <>
          <section className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-5">
              <div>
                <img
                  className="h-[400px] w-fit"
                  src={product?.image}
                  alt={product?.name}
                />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl">{product?.name}</h1>
                <div className="flex items-center gap-2">
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={product?.ratings}
                    readOnly
                  />
                  <span>({product?.ratings})</span>
                </div>
                <p className="text-2xl flex gap-3">
                  <span
                    className={product?.discount && "line-through text-red-500"}
                  >
                    {product?.price}&#2547;
                  </span>
                  {product?.discount && (
                    <span className="text-blue-700">
                      {product?.price -
                        (product?.price * product?.discount) / 100}
                      &#2547;
                    </span>
                  )}
                </p>
                <AddToCartBtn
                  className="w-[200px]"
                  productInfo={{
                    image: product?.image,
                    name: product?.name,
                    productID: product._id,
                    price: product?.discount
                      ? product?.price -
                        (product?.price * product?.discount) / 100
                      : product.price,
                    quantity: 1,
                  }}
                />
                <p className="text-lg">Category: {product?.category}</p>
              </div>
            </div>
          </section>
          <section className="my-10">
            <div className="text-xl mx-auto text-justify border p-5 md:p-10">
              {product?.description}
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default ProductDetailsPage;
