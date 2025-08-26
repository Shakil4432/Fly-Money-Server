"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import Category from "../category";

export default function AutoSlider() {
  return (
    <div className="bg-[#f9f5f0]/30">
      <div className=" mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Carousel Section */}
          <div className="col-span-2 w-full">
            <Swiper
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop
              modules={[Navigation, Pagination, Autoplay]}
              className="overflow-hidden rounded-2xl"
            >
              {/* Slide 1 */}
              <SwiperSlide>
                <div className="bg-gray-100 flex flex-col md:flex-row items-center justify-between p-6 md:p-16 h-[60vh] md:h-[50vh] lg:h-[60vh] rounded-2xl">
                  <div className="text-center md:text-left mb-6 md:mb-0">
                    <p className="text-gray-600 text-sm mb-2 uppercase">
                      Exclusive Deal
                    </p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 uppercase">
                      Handcrafted Leather Bag
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                      <span className="text-red-500 font-bold text-2xl sm:text-3xl">
                        ₹7,999
                      </span>
                    </p>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                  <Image
                    src="/leather-2.png"
                    alt="Leather Bag"
                    width={400}
                    height={400}
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                  />
                </div>
              </SwiperSlide>

              {/* Slide 2 */}
              <SwiperSlide>
                <div className="bg-[#f9f5f0]/40 flex flex-col md:flex-row items-center justify-between p-6 md:p-16 h-[60vh] md:h-[50vh] lg:h-[60vh] rounded-2xl">
                  <div className="text-center md:text-left mb-6 md:mb-0">
                    <p className="text-gray-600 text-sm mb-2 uppercase">
                      Best Seller
                    </p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 uppercase">
                      Premium Leather Wallet
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                      <span className="text-red-500 font-bold text-2xl sm:text-3xl">
                        ₹999
                      </span>
                    </p>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                  <Image
                    src="/wallet.png"
                    alt="Leather Wallet"
                    width={400}
                    height={400}
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Side Deal Cards */}
          <div className="flex flex-col gap-4 mt-4 lg:mt-0">
            {/* Card 1 */}
            <div className="bg-blue-100/30 p-4 flex-1 flex flex-col items-center justify-center rounded-2xl h-48 md:h-[50%]">
              <p className="font-semibold text-2xl sm:text-3xl md:text-4xl text-center">
                Buy Leather Belt
              </p>
              <p className="text-red-500 font-bold text-xl sm:text-2xl md:text-2xl">
                ₹1,499
              </p>
              <button className="mt-2 text-lg text-blue-700 font-semibold underline">
                SHOP NOW
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-green-100/30 p-4 flex-1 flex flex-col items-center justify-center rounded-2xl h-48 md:h-[50%]">
              <p className="font-semibold text-2xl sm:text-3xl md:text-4xl text-center">
                Buy Leather Shoes
              </p>
              <p className="text-red-500 font-bold text-xl sm:text-2xl md:text-2xl">
                ₹2,499
              </p>
              <button className="mt-2 text-lg text-blue-700 font-semibold underline">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mt-8">
        <Category />
      </div>
    </div>
  );
}
