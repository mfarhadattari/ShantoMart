import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner1 from "../../../assets/Banners/banner1.jpg";
import banner2 from "../../../assets/Banners/banner2.jpg";
import banner3 from "../../../assets/Banners/banner3.jpg";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import TextModifier from "react-text-modifier";

const sliders = [
  {
    id: 1,
    image: banner1,
    heading: "Shop Smarter, \n Dress Better",
  },
  {
    id: 2,
    image: banner2,
    heading: "Unlock the Secrets of \n Effortless Style..",
  },
  {
    id: 3,
    image: banner3,
    heading: "Step into a World of \n Unforgettable Fashion.",
  },
];

const Banner = () => {
  return (
    <section className="w-full">
      <Swiper
        cssMode={true}
        loop
        navigation={true}
        pagination={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="max-h-[500px] w-full"
      >
        {sliders.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative">
              <img src={slide.image} className="max-h-[500px] w-full" alt="" />
              <div className="w-full h-full absolute top-0 bg-black bg-opacity-60"></div>
              <div className="absolute bottom-10 lg:bottom-20 right-10 md:right-20 text-white">
                <h1 className="text-2xl md:text-4xl">
                  <TextModifier text={slide.heading} />
                </h1>
                <Link
                  to="/shop"
                  className="btn btn-sm md:btn-md rounded-none md:mt-5"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
