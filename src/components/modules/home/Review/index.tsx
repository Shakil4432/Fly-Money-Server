"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Star } from "lucide-react";

export default function ReviewSlider({ reviews }: { reviews: any }) {
  return (
    <div className="w-full flex items-center justify-center flex-col lg:mt-10  py-12 px-4 bg-gradient-to-b from-[#f9f9f9] to-[#7c3f00]/10 h-[60vh]">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        What Our Customers Say
      </h2>

      <div className="w-full container mx-auto h-full flex items-center justify-center ">
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full mx-auto h-[250px] "
        >
          {reviews.map((review: any) => (
            <SwiperSlide
              key={review._id}
              className="flex items-center justify-center"
            >
              <div className="bg-white rounded-sm shadow-sm p-6 flex flex-col h-[200px] hover:shadow-md transition-all duration-300">
                {/* User Info */}
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={
                      review.user?.photo ||
                      "https://randomuser.me/api/portraits/men/75.jpg"
                    }
                    alt={review.user.name}
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-green-500 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {review.user.name}
                    </h3>
                    <p className="text-sm text-gray-500">{review.user.role}</p>
                  </div>
                </div>

                {/* Review */}
                <p className="text-gray-700 flex-grow italic mb-4">
                  “{review.review}”
                </p>

                {/* Rating */}
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
