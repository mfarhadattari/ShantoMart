const AddToCartBtn = ({ className }) => {
  return (
    <button
      className={`btn rounded-none bg-blue-500 text-white hover:bg-blue-600 ${className}`}
    >
      Add to cart
    </button>
  );
};

export default AddToCartBtn;
