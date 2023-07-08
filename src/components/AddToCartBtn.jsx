import { toast } from "react-hot-toast";
import useAuth from "./../hooks/useAuth";
import useAxiosPublic from "./../hooks/useAxiosPublic";

const AddToCartBtn = ({ className, productInfo }) => {
  const { authUser, authLoading } = useAuth();
  const { axiosPublic } = useAxiosPublic();

  const handelAddToCart = () => {
    if (!productInfo || !authUser || authLoading) {
      return;
    }
    axiosPublic
      .post("/add-to-cart", {
        phoneNumber: authUser.phoneNumber,
        userName: authUser.displayName,
        ...productInfo,
      })
      .then(({ data }) => {
        if (data.insertedId || data.modifiedCount) {
          toast("Successfully added in Cart");
        }
      });
  };

  return (
    <button
      onClick={handelAddToCart}
      className={`btn rounded-none bg-blue-500 text-white hover:bg-blue-600 ${className}`}
    >
      Add to cart
    </button>
  );
};

export default AddToCartBtn;
