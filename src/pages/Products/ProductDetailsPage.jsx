import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loaders from "../../components/Loaders";
import { Rating } from "@smastrom/react-rating";
import AddToCartBtn from "../../components/AddToCartBtn";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PageTitle from "../../components/PageTitle";

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
      <PageTitle title="Product Details | ShantoMart"/>
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
                  className="w-full"
                  src={product?.image}
                  alt={product?.name}
                />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl">{product?.name}</h1>
                {product?.rating && (
                  <div className="flex items-center gap-2">
                    <Rating
                      style={{ maxWidth: 100 }}
                      value={product?.ratings}
                      readOnly
                    />
                    <span>({product?.ratings})</span>
                  </div>
                )}
                <p className="text-2xl flex gap-3">
                  <span
                    className={product?.discount && "line-through text-red-500"}
                  >
                    {product?.price}&#2547;
                  </span>
                  {product?.discount > 0 && (
                    <span className="text-blue-700">
                      {Math.round(
                        product?.price -
                          (product?.price * product?.discount) / 100
                      )}
                      &#2547;
                    </span>
                  )}
                </p>

                {product?.featured && (
                  <ul className="text-lg list-disc ps-5">
                    {product?.featured?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                {product?.size && (
                  <div className="flex gap-5">
                    Available Size:
                    {product?.size?.map((item, idx) => (
                      <span key={idx} className="text-blue-700">
                        {item}
                      </span>
                    ))}
                  </div>
                )}

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
