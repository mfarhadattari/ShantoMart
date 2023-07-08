import { Link } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";

const ProductCard = ({ productInfo }) => {
  const { name, price, discount, image, _id } = productInfo;
  const discountPrice = price - (price * discount) / 100;

  return (
    <div className="card w-full rounded-none h-[500px] flex flex-col justify-between">
      <Link to={`/products/${_id}`}>
        <figure>
          <img className="w-full h-[300px]" src={image} alt={name} />
        </figure>
        <div className="card-body text-center pb-2">
          <h2 className="card-title w-fit mx-auto">{name}</h2>
          <p className="text-2xl flex gap-3 justify-center">
            <span className={discount > 0 ? "line-through text-red-500" : ""}>
              {price}&#2547;
            </span>
            {discount > 0 && (
              <span className="text-blue-700">
                {discountPrice}
                &#2547;
              </span>
            )}
          </p>
        </div>
      </Link>
      <AddToCartBtn
        className="w-full"
        productInfo={{
          image: image,
          name: name,
          productID: _id,
          price: discount > 0 ? discountPrice : price,
          quantity: 1,
        }}
      />
    </div>
  );
};

export default ProductCard;
