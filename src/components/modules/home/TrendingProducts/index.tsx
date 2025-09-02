"use client";

import { ShoppingCart, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useAppDispatch } from "@/Redux/hooks";
import { addProduct } from "@/Redux/features/cartSlice";
import { toast } from "sonner";

interface IProduct {
  orderCount: number;
  productId: string;
  name: string;
  price: number;
  imageUrls: string[];
}

interface TrendingProductsProps {
  trendingProduct: IProduct[];
  title?: string;
}

const TrendingProducts = ({
  trendingProduct,
  title = "Best Selling ",
}: TrendingProductsProps) => {
  const dispatch = useAppDispatch();

  const handleAddToProduct = (product: IProduct) => {
    dispatch(addProduct(product));
    toast.success(`${product.name} add to cart`);
  };
  return (
    <div className="container mx-auto lg:mt-16 md:mt-32 px-4 md:px-0 ">
      <div className="flex  items-start justify-between py-6 md:py-10 gap-4 md:gap-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg lg:text-3xl md:text-3xl font-bold text-[#7c3f00]">
              {title}
            </h2>
            <Link href={"/products"}>
              <Button
                className="w-full mt-auto block lg:hidden text-sm  border-none text-[#7c3f00] hover:bg-[#7c3f00]/20 bg-white  gap-2 lg:text-xs sm:text-sm md:text-base"
                variant="outline"
              >
                See more...
              </Button>
            </Link>
          </div>
          <p className="text-gray-500 text-sm md:text-base">
            Check out our most popular and highly ordered products.
          </p>
        </div>
        <div>
          <Link href={"/products"}>
            <Button
              className="w-full hidden lg:block mt-auto text-sm rounded-md border border-[#7c3f00] text-[#7c3f00] hover:bg-[#7c3f00]/20 bg-white  lg:text-xs sm:text-sm md:text-base"
              variant="outline"
            >
              All Collection
            </Button>
          </Link>
        </div>
      </div>

      {trendingProduct.length > 0 ? (
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
          className="mt-4  pb-4 h-[370px]  lg:h-[470px]"
        >
          {trendingProduct.map((product) => (
            <SwiperSlide key={product.productId}>
              <div className="border h-[310px] lg:h-[400px] rounded-sm shadow-sm bg-white  flex flex-col ">
                {/* Product Image */}
                <div className="relative w-full h-56  aspect-square bg-[#f9f5f0]/30  overflow-hidden">
                  <Image
                    src={
                      product?.imageUrls[0] ||
                      "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                    }
                    alt={product?.name || "Leather product image"}
                    height={400}
                    width={400}
                    className="w-full h-full object-cover rounded-t-sm  transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Product Name */}
                <Link href={`/products/${product.productId}`}>
                  <h3 className="text-xs px-4 sm:text-sm md:text-base lg:text-lg font-semibold mt-2 hover:text-[#7c3f00] line-clamp-2 truncate">
                    {product.name}
                  </h3>
                </Link>

                {/* Ratings Demo (Static) */}
                <div className="flex items-center px-4 gap-1 text-yellow-500 my-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        i < 4
                          ? "fill-yellow-500"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Price & Orders */}
                <div className="flex items-center justify-between mt-1 px-4">
                  <span className="text-[#7c3f00] font-bold text-sm sm:text-base md:text-lg">
                    ₹{product.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">
                    {product.orderCount} Orders
                  </span>
                </div>

                {/* Button */}
                <div className="p-4 mt-auto">
                  <Button
                    onClick={() => handleAddToProduct(product)}
                    className="w-full  rounded-sm border border-[#7c3f00] text-[#7c3f00] hover:bg-[#7c3f00]/20 bg-white flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base"
                    variant="outline"
                  >
                    <ShoppingCart className="h-4 w-4" /> Add To Cart
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500 mt-4">No products available.</p>
      )}
    </div>
  );
};

export default TrendingProducts;
