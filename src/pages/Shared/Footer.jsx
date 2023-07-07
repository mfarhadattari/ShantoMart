import moment from "moment/moment";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200">
      <div className="p-10 text-base-content text-center md:text-left grid grid-cols-1 md:grid-cols-2 space-y-5 lg:grid-cols-4 justify-between">
        <div className="w-fit flex flex-col items-center mx-auto md:mx-0 gap-3">
          <img src="/icon.png" className="h-[100px] w-[100px]" alt="" />
          <h1 className="text-2xl font-bold">ShantoMart</h1>
          <div>
            <p className="flex gap-2 items-center text-base">
              <FaEnvelope></FaEnvelope>info@ShantoMart.com
            </p>
            <p className="flex gap-2 items-center text-base">
              <FaPhone></FaPhone>+880 1234567890
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="footer-title">Company</span>

          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/products" className="link link-hover">
            Products
          </Link>
          <Link to="#" className="link link-hover">
            About Us
          </Link>
          <Link to="#" className="link link-hover">
            Contract Us
          </Link>
        </div>
        <div className="flex flex-col">
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
        <div>
          <span className="footer-title">Newsletter</span>
          <form
            className="form-control w-80"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email"
                required
                className="input input-bordered rounded-none w-full pr-16"
              />
              <button className="absolute top-0 right-0 h-full btn btn-secondary rounded-none">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="footer footer-center p-4 text-base-content border-t">
        <p>
          Copyright © {moment().format("YYYY")} - All right reserved by
          ShantoMart
        </p>
      </div>
    </footer>
  );
};

export default Footer;
