import { useQuery } from "react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import SectionHeading from "../../../components/SectionHeading";
import Loaders from "../../../components/Loaders";

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
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", axiosPublic, id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${id}`);
      return await res.data;
    },
  });
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
          <form>
            <div className="grid grid-col lg:grid-cols-3 gap-5">
              <div>
                <img src={product.image} className="h-full " />
              </div>
              <div className="col-span-2">
                <div className="space-y-2">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Product name*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={product.name}
                      placeholder="Product name"
                      className="input input-bordered rounded-none "
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Category*</span>
                      </label>
                      <select
                        className="select select-bordered rounded-none w-full max-w-xs"
                        defaultValue={product.category}
                      >
                        <option>{product.category}</option>
                        {categories.map((category, idx) => (
                          <option key={idx}>{category}</option>
                        ))}
                      </select>
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
                      />
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
                      />
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
                      />
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
                      />
                    </div>

                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Image*</span>
                      </label>
                      <input
                        type="file"
                        className="file-input w-full rounded-none bg-gray-200"
                      />
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
              ></textarea>
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
