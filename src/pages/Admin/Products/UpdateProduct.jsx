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
        <section className="my-10">
          <form onSubmit={handleSubmit(handelUpdate)}>
            <div className="grid grid-col lg:grid-cols-3 gap-5">
              <div>
                <label className="label">
                  <span className="label-text">Product Image*</span>
                </label>
                <img src={imageURL || product.image} />
              </div>
              <div className="col-span-2">
                <div className="space-y-2">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Product Name*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={product.name}
                      placeholder="Product name"
                      className="input input-bordered rounded-none "
                      {...register("name", { required: true })}
                    />
                    {errors?.name && (
                      <p className="errorText">Name is required</p>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Category*</span>
                      </label>
                      <select
                        className="select select-bordered rounded-none w-full max-w-xs"
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
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Seller*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Seller"
                        defaultValue={product.seller}
                        className="input input-bordered rounded-none"
                        {...register("seller", { required: true })}
                      />
                      {errors?.seller && (
                        <p className="errorText">Seller is required</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Price*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Price"
                        defaultValue={product.price}
                        className="input input-bordered rounded-none"
                        {...register("price", { required: true })}
                      />
                      {errors?.price && (
                        <p className="errorText">Price is required</p>
                      )}
                    </div>
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Discount*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Discount"
                        defaultValue={product.discount}
                        className="input input-bordered rounded-none"
                        {...register("discount", { required: true })}
                      />
                      {errors?.discount && (
                        <p className="errorText">Discount is required</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Stock*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Stock"
                        defaultValue={product.stock}
                        className="input input-bordered rounded-none"
                        {...register("stock", { required: true })}
                      />
                      {errors?.stock && (
                        <p className="errorText">Stock is required</p>
                      )}
                    </div>

                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Image URL*</span>
                      </label>
                      <input
                        type="url"
                        className="input input-bordered rounded-none"
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
            <div className="form-control w-full mt-5">
              <label className="label">
                <span className="label-text">Products Description*</span>
              </label>
              <textarea
                className="textarea textarea-bordered rounded-none"
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
