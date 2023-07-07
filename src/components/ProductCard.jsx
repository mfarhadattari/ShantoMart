import { Link } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";

const ProductCard = ({ productInfo }) => {
  return (
    <div className="card w-full rounded-none">
      <Link to={`/products/${productInfo?._id}`}>
        <figure>
          <img
            className="w-full h-[300px]"
            src={productInfo?.image}
            alt={productInfo?.name}
          />
        </figure>
        <div className="card-body text-center pb-2">
          <h2 className="card-title w-fit mx-auto">{productInfo?.name}</h2>
          <p className="text-2xl flex gap-3 justify-center">
            <span
              className={productInfo?.discount && "line-through text-red-500"}
            >
              {productInfo?.price}&#2547;
            </span>
            {productInfo?.discount && (
              <span className="text-blue-700">
                {productInfo?.discount &&
                  productInfo?.price -
                    (productInfo?.price * productInfo?.discount) / 100}
                &#2547;
              </span>
            )}
          </p>
        </div>
      </Link>
      <AddToCartBtn />
    </div>
  );
};

export default ProductCard;
