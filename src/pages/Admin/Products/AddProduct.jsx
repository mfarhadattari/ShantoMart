import { FaUtensils } from "react-icons/fa";
import SectionHeading from "./../../../components/SectionHeading";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-hot-toast";
import moment from 'moment/moment'

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
  "Electronic",
];

const AddProduct = () => {
  const { axiosPublic } = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(import.meta.env.VITE_IMG_HOSTING, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imageURL = imgResponse.data.display_url;
          const timeDate = moment().format("YYYY-MM-DD:HH-mm-ss")
          const {
            name,
            category,
            price,
            description,
            discount,
            stock,
            seller,
          } = data;
          const product = {
            name,
            category,
            seller,
            image: imageURL,
            price: parseInt(price),
            discount: parseInt(discount),
            stock: parseInt(stock),
            description,
            timeDate
          };
          axiosPublic.post("/admin/add-product", product).then(({ data }) => {
            if (data.insertedId) {
              toast("Successfully Added!");
              reset()
            }
          });
        }
      });
  };

  return (
    <main>
      <SectionHeading heading="Add Product" subheading="Add New Product!" />
      <section>
        <div className="card rounded-none w-4/5 mx-auto">
          <form
            className="card-body space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* ------ Product Name------- */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product name*</span>
              </label>
              <input
                type="text"
                placeholder="Product name"
                className="input input-bordered rounded-none "
                {...register("name", { required: true })}
              />
              {errors.name && <p className="errorText">Name is required</p>}
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              {/* ------ Product Category------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Category*</span>
                </label>
                <select
                  className="select select-bordered rounded-none w-full"
                  {...register("category", { required: true })}
                >
                  {categories.map((category, idx) => (
                    <option key={idx}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="errorText">Category is required</p>
                )}
              </div>
              {/* ------ Product Seller------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Seller*</span>
                </label>
                <input
                  type="text"
                  placeholder="Seller"
                  className="input input-bordered rounded-none"
                  {...register("seller", { required: true })}
                />
                {errors.seller && (
                  <p className="errorText">Seller is required</p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              {/* ------ Product Price------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Price*</span>
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  min={0}
                  className="input input-bordered rounded-none"
                  {...register("price", { required: true })}
                />
                {errors.price && <p className="errorText">Price is required</p>}
              </div>
              {/* ------ Product Discount------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Discount*</span>
                </label>
                <input
                  type="number"
                  placeholder="Discount"
                  min={0}
                  className="input input-bordered rounded-none"
                  {...register("discount", { required: true })}
                />
                {errors.discount && (
                  <p className="errorText">Discount is required</p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              {/* ------ Product Stock------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Stock*</span>
                </label>
                <input
                  type="number"
                  placeholder="Stock"
                  min={0}
                  className="input input-bordered rounded-none"
                  {...register("stock", { required: true })}
                />
                {errors.stock && <p className="errorText">Stock is required</p>}
              </div>
              {/* ------ Product Image------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Image*</span>
                </label>
                <input
                  type="file"
                  className="file-input w-full rounded-none bg-gray-200"
                  {...register("image", { required: true })}
                />
                {errors.image && <p className="errorText">Image is required</p>}
              </div>
            </div>
            {/* ------ Products Description------- */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Products Description*</span>
              </label>
              <textarea
                className="textarea textarea-bordered rounded-none"
                rows={4}
                placeholder="Products Description"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description && (
                <p className="errorText">Description is required</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-info text-white rounded-none">
                Add Item <FaUtensils></FaUtensils>
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AddProduct;
