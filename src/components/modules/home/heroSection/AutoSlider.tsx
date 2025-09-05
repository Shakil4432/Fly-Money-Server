"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import Category from "../category";

// ✅ Framer Motion
import { motion, Variants } from "framer-motion";

const textVariant: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariant: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

export default function AutoSlider() {
  return (
    <div className="bg-[#f9f5f0]/30">
      <div className="mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Carousel Section */}
          <div className="col-span-2 w-full">
            <Swiper
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop
              modules={[Navigation, Pagination, Autoplay]}
              className="overflow-hidden rounded-sm lg:rounded-2xl"
            >
              {/* Slide 1 */}
              <SwiperSlide>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="bg-red-50 flex flex-col md:flex-row items-center justify-between p-6 md:p-16 lg:h-[70vh] rounded-2xl"
                >
                  <motion.div
                    variants={textVariant}
                    className="text-center md:text-left mb-6 md:mb-0"
                  >
                    <p className="text-gray-600 text-sm mb-2 uppercase">
                      Exclusive Deal
                    </p>
                    <h2 className="text-xl lg:text-4xl md:text-6xl font-bold mb-2 uppercase">
                      Handcrafted Leather Bag
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                      <span className="text-red-500 font-bold text-xl lg:text-2xl sm:text-3xl">
                        ₹7,999
                      </span>
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-red-500 text-white px-2 py-1 lg:px-4 lg:py-2 rounded hover:bg-red-600 transition-all duration-300"
                    >
                      Shop Now
                    </motion.button>
                  </motion.div>
                  <motion.div variants={imageVariant}>
                    <Image
                      src="/leather-2.png"
                      alt="Leather Bag"
                      width={400}
                      height={400}
                      className="w-full h-52 lg:h-full max-w-lg lg:max-w-md md:max-w-sm"
                    />
                  </motion.div>
                </motion.div>
              </SwiperSlide>

              {/* Slide 2 */}
              <SwiperSlide>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="bg-[#f9f5f0] flex flex-col md:flex-row items-center justify-between p-6 md:p-16 lg:h-[70vh] md:h-[50vh] rounded-2xl"
                >
                  <motion.div
                    variants={textVariant}
                    className="text-center md:text-left mb-6 md:mb-0"
                  >
                    <p className="text-gray-600 text-sm mb-2 uppercase">
                      Best Seller
                    </p>
                    <h2 className="text-xl lg:text-4xl md:text-6xl font-bold mb-2 uppercase">
                      Premium Leather Wallet
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                      <span className="text-red-500 font-bold text-xl lg:text-2xl sm:text-3xl">
                        ₹999
                      </span>
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-red-500 text-white px-2 py-1 lg:px-4 lg:py-2 rounded hover:bg-red-600 transition-all duration-300"
                    >
                      Shop Now
                    </motion.button>
                  </motion.div>
                  <motion.div variants={imageVariant}>
                    <Image
                      src="/wallet.png"
                      alt="Leather Wallet"
                      width={400}
                      height={400}
                      className="w-full h-52 lg:h-full max-w-lg lg:max-w-md md:max-w-sm"
                    />
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Side Deal Cards */}
          <div className="hidden lg:flex flex-col gap-4 mt-4 lg:mt-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariant}
              className="bg-blue-100/30 p-4 flex-1 flex flex-col items-center justify-center rounded-2xl h-48 md:h-[50%]"
            >
              <p className="font-semibold text-2xl sm:text-3xl md:text-4xl text-center">
                Buy Leather Belt
              </p>
              <p className="text-red-500 font-bold text-xl sm:text-2xl md:text-2xl">
                ₹1,499
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="mt-2 text-lg text-blue-700 font-semibold underline"
              >
                SHOP NOW
              </motion.button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariant}
              transition={{ delay: 0.2 }}
              className="bg-green-100/30 p-4 flex-1 flex flex-col items-center justify-center rounded-2xl h-48 md:h-[50%]"
            >
              <p className="font-semibold text-2xl sm:text-3xl md:text-4xl text-center">
                Buy Leather Shoes
              </p>
              <p className="text-red-500 font-bold text-xl sm:text-2xl md:text-2xl">
                ₹2,499
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="mt-2 text-lg text-blue-700 font-semibold underline"
              >
                SHOP NOW
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lg:mt-8"
      >
        <Category />
      </motion.div>
    </div>
  );
}
