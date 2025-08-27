"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product";
import { ShoppingCart, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const NewArrivalSlider = ({ newArrivals }: { newArrivals: IProduct[] }) => {
  const router = useRouter();
  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams();
    params.set(query, value.toString());
    router.push(`/products?${params.toString()}`);
  };
  return (
    <div className="w-full py-8 container mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl text-[#7c3f00] font-bold  lg:mt-16 md:mt-28">
          New Arrivals
        </h2>
        <Button
          onClick={() => handleSearchQuery("sort", "-createdAt")}
          className=" mt-auto rounded-md border border-[#7c3f00] text-[#7c3f00] hover:bg-[#7c3f00]/20 bg-white flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base"
          variant="outline"
        >
          All Collection
        </Button>
      </div>
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={16}
        slidesPerView={2} // Default mobile view
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="mt-4  pb-4 h-[500px]"
      >
        {newArrivals.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="bg-white mt-10 border border-[#7c3f00]/10  shadow-sm overflow-hidden relative group  rounded-sm">
              {/* Discount Badge */}

              {/* Product Image */}
              <div className="relative w-full h-56 aspect-square bg-[#f9f5f0]/30 rounded overflow-hidden">
                <Image
                  src={
                    product?.imageUrls[0] ||
                    "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                  }
                  alt={product?.name || "Leather product image"}
                  height={400}
                  width={400}
                  className="w-full h-full object-cover  transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Product Details */}
              <div className="p-3">
                <p className="text-sm text-gray-500">{product?.brand}</p>
                <h3 className="text-base font-medium truncate">
                  {product?.name}
                </h3>

                {/* Ratings */}
                <div className="flex items-center gap-1 text-yellow-500 my-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < product?.averageRating
                          ? "fill-yellow-500"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  {product?.offerPrice ? (
                    <>
                      <span className="text-gray-400 line-through text-sm">
                        ₹{product?.price.toFixed(2)}
                      </span>
                      <span className="text-red-500 font-bold text-lg">
                        ₹{product?.offerPrice.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-[#7c3f00] font-bold text-lg">
                      ₹{product?.price.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Add to Cart */}
                <Button
                  variant="outline"
                  className="mt-3 w-full bg-white flex items-center justify-center gap-2 border-[#7c3f00]/30 text-[#7c3f00] hover:bg-[#7c3f00]/20"
                >
                  <ShoppingCart></ShoppingCart> ADD TO CART
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewArrivalSlider;
