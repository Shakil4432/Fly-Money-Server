"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Category from "../category";

// ✅ Framer Motion
import { motion } from "framer-motion";

// const textVariant: Variants = {
//   hidden: { opacity: 0, x: -50 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

// const imageVariant: Variants = {
//   hidden: { opacity: 0, x: 50 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

// const cardVariant: Variants = {
//   hidden: { opacity: 0, y: 40, scale: 0.95 },
//   visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
// };

export default function AutoSlider() {
  return (
    <div className="bg-[#f9f5f0]/90">
      <div className="mx-auto ">
        <div className=" gap-4 pt-2 px-1">
          {/* Carousel Section */}
          <div className=" w-full ">
            <Swiper
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop
              modules={[Navigation, Pagination, Autoplay]}
              className="overflow-hidden "
            >
              {/* Slide 1 */}
              <SwiperSlide>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="bg-red-50 flex flex-col md:flex-row items-center justify-between   h-[23vh] lg:h-[80vh] rounded-sm "
                  style={{
                    backgroundImage: "url('/banner1.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></motion.div>
              </SwiperSlide>

              {/* Slide 2 */}
              <SwiperSlide>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="bg-red-50 flex flex-col md:flex-row items-center justify-between   h-[23vh] lg:h-[80vh] rounded-sm"
                  style={{
                    backgroundImage: "url('/flashsale.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></motion.div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Category />
      </motion.div>
    </div>
  );
}
