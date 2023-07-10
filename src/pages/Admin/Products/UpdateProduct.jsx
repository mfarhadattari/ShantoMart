import { useQuery } from "react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import SectionHeading from "../../../components/SectionHeading";
import Loaders from "../../../components/Loaders";
import { useForm } from "react-hook-form";
import moment from "moment";
import { toast } from "react-hot-toast";
import { useState } from "react";

const categories = [
  "Sneakers",
  "Boots",
  "Heels",
  "T-shirts",
  "Pants",
  "Jeans",
  "Shirts",
  "Sweaters",
  "Jackets",
  "Wallets",
  "Watches",
  "Jewelry",
];

const UpdateProduct = () => {
  const { id } = useParams();
  const { axiosPublic } = useAxiosPublic();
  const {
    data: product = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", axiosPublic, id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${id}`);
      return await res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [imageURL, setImageURL] = useState("");
  const handelUpdate = (data) => {
    const {
      name,
      category,
      price,
      description,
      discount,
      stock,
      seller,
      image,
    } = data;
    const timeDate = moment().format("YYYY-MM-DD:HH-mm-ss");
    const updateInfo = {
      name,
      category,
      seller,
      image,
      price: parseInt(price),
      discount: parseInt(discount),
      stock: parseInt(stock),
      description,
      timeDate,
    };

    axiosPublic
      .patch(`/admin/update-product/${product._id}`, updateInfo)
      .then(({ data }) => {
        if (data.modifiedCount > 0) {
          toast("Updated Successfully!");
          refetch();
        }
      });
  };

  return (
    <main>
      <SectionHeading
        heading="Update Product"
        subheading="Update Information of product!"
      />
      {isLoading ? (
        <div className="h-[300px] flex justify-center items-center">
          <Loaders></Loaders>
        </div>
      ) : (
        <section className="my-10 p-5 md:p-10">
          <form onSubmit={handleSubmit(handelUpdate)}>
            <div className="grid grid-col md:grid-cols-2 md:items-end lg:items-start lg:grid-cols-3 gap-5">
              <div>
                <div>
                  <label className="label">
                    <span className="label-text">Product Image*</span>
                  </label>
                  <img src={imageURL || product.image} />
                </div>
                {/* ------------------ Product Description for Medium Device ---------------- */}
                <div className="form-control w-full mt-5 hidden md:flex lg:hidden">
                  <label className="label">
                    <span className="label-text">Products Description*</span>
                  </label>
                  <textarea
                    className="textarea-field"
                    rows={4}
                    placeholder="Products Description"
                    defaultValue={product.description}
                    {...register("description", { required: true })}
                  ></textarea>
                  {errors?.description && (
                    <p className="errorText">Description is required</p>
                  )}
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="space-y-2">
                  {/* ------------------ Product Name ---------------- */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Product Name*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={product.name}
                      placeholder="Product name"
                      className="input-field"
                      {...register("name", { required: true })}
                    />
                    {errors?.name && (
                      <p className="errorText">Name is required</p>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row gap-5">
                    {/* ------------------ Product Category ---------------- */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Category*</span>
                      </label>
                      <select
                        className="select-field"
                        defaultValue={product.category}
                        {...register("category", { required: true })}
                      >
                        <option>{product.category}</option>
                        {categories.map((category, idx) => (
                          <option key={idx}>{category}</option>
                        ))}
                      </select>
                      {errors?.category && (
                        <p className="errorText">Category is required</p>
                      )}
                    </div>
                    {/* ------------------ Product Seller ---------------- */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Seller*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Seller"
                        defaultValue={product.seller}
                        className="input-field"
                        {...register("seller", { required: true })}
                      />
                      {errors?.seller && (
                        <p className="errorText">Seller is required</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-5">
                    {/* ------------------ Product Price ---------------- */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Price*</span>
                      </label>
                      <div className="relative border border-gray-500">
                        <input
                          type="number"
                          placeholder="Price"
                          defaultValue={product.price}
                          className="input rounded-none w-full"
                          {...register("price", { required: true })}
                        />
                        <p className="absolute flex items-center h-full w-fit text-md top-0 right-0 px-3 bg-white">
                          &#2547;
                        </p>
                      </div>
                      {errors?.price && (
                        <p className="errorText">Price is required</p>
                      )}
                    </div>
                    {/* ------------------ Product Discount ---------------- */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Discount*</span>
                      </label>
                      <div className="relative border border-gray-500">
                        <input
                          type="number"
                          placeholder="Discount"
                          defaultValue={product.discount}
                          className="input rounded-none w-full"
                          {...register("discount", { required: true })}
                        />
                        <p className="absolute flex items-center h-full w-fit text-md top-0 right-0 px-3 bg-white">
                          %
                        </p>
                      </div>
                      {errors?.discount && (
                        <p className="errorText">Discount is required</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-5">
                    {/* ------------------ Product Stock ---------------- */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Stock*</span>
                      </label>
                      <div className="relative border border-gray-500">
                        <input
                          type="number"
                          placeholder="Stock"
                          defaultValue={product.stock}
                          className="input rounded-none w-full"
                          {...register("stock", { required: true })}
                        />
                        <p className="absolute flex items-center h-full w-fit text-md top-0 right-0 px-3 bg-white">
                          Pes
                        </p>
                      </div>
                      {errors?.stock && (
                        <p className="errorText">Stock is required</p>
                      )}
                    </div>
                    {/* ------------------ Product Image ---------------- */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Image URL*</span>
                      </label>
                      <input
                        type="url"
                        className="input-field"
                        defaultValue={product.image}
                        onBlurCapture={(e) => setImageURL(e.target.value)}
                        {...register("image", { required: true })}
                      />
                      {errors?.image && (
                        <p className="errorText">Image URL is required</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------ Product Description from small and large ---------------- */}
            <div className="form-control w-full mt-5 md:hidden lg:flex">
              <label className="label">
                <span className="label-text">Products Description*</span>
              </label>
              <textarea
                className="textarea-field"
                rows={4}
                placeholder="Products Description"
                defaultValue={product.description}
                {...register("description", { required: true })}
              ></textarea>
              {errors?.description && (
                <p className="errorText">Description is required</p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-success text-white rounded-none">
                Update
              </button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
};

export default UpdateProduct;
