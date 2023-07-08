import { FaUtensils } from "react-icons/fa";
import SectionHeading from "./../../../components/SectionHeading";

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

const AddProduct = () => {
  return (
    <main>
      <SectionHeading heading="Add Product" subheading="Add New Product!" />
      <section>
        <div className="card rounded-none w-4/5 mx-auto">
          <form className="card-body space-y-2">
            {/* ------ Product Name------- */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product name*</span>
              </label>
              <input
                type="text"
                placeholder="Product name"
                className="input input-bordered rounded-none "
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              {/* ------ Product Category------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Category*</span>
                </label>
                <select className="select select-bordered rounded-none w-full max-w-xs">
                  {categories.map((category, idx) => (
                    <option key={idx}>{category}</option>
                  ))}
                </select>
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
                />
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
                  className="input input-bordered rounded-none"
                />
              </div>
              {/* ------ Product Discount------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Discount*</span>
                </label>
                <input
                  type="number"
                  placeholder="Discount"
                  className="input input-bordered rounded-none"
                />
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
                  className="input input-bordered rounded-none"
                />
              </div>
              {/* ------ Product Image------- */}
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
            {/* ------ Products Description------- */}
            <div className="form-control w-full">
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
