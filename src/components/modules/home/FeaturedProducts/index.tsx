"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICategory } from "@/types/category";
import { IProduct } from "@/types/product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

interface FeaturedProductsProps {
  ParentCategories: ICategory[];
  products: IProduct[];
  title?: string;
}

const FeaturedProducts = ({
  ParentCategories,
  products,
  title = "Featured Products",
}: FeaturedProductsProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [defaultTab, setDefaultTab] = useState<string>("");

  useEffect(() => {
    if (ParentCategories.length > 0) {
      setSelectedCategoryId(ParentCategories[0]._id);
      setDefaultTab(ParentCategories[0].name);
    }
  }, [ParentCategories]);

  const filteredProducts = products.filter(
    (product: IProduct) => product.parentCategory?._id === selectedCategoryId
  );

  return (
    <div className="container mx-auto lg:mt-16 md:mt-32 px-4 md:px-0">
      {defaultTab && (
        <Tabs defaultValue={defaultTab} className="w-full">
          {/* Tabs Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-6 md:py-10 gap-4 md:gap-0">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-[#7c3f00]">
                {title}
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                Discover our most popular and highly rated items.
              </p>
            </div>

            <div className="overflow-x-auto w-full md:w-auto">
              <TabsList className="flex gap-2 md:gap-4 items-center bg-white px-2 md:px-0 rounded-md">
                {ParentCategories.slice(0, 6).map((cat) => (
                  <TabsTrigger
                    key={cat._id}
                    value={cat.name}
                    onClick={() => setSelectedCategoryId(cat._id)}
                    className="whitespace-nowrap font-medium text-gray-600 data-[state=active]:text-[#7c3f00] data-[state=active]:border-b-2 data-[state=active]:border-[#7c3f00] data-[state=active]:font-semibold py-2 lg:px-4 md:px-6 transition"
                  >
                    {cat.name.toUpperCase()}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          {/* Tabs Content */}
          {ParentCategories.map((cat) => (
            <TabsContent key={cat._id} value={cat.name}>
              {filteredProducts.length > 0 ? (
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
                  className="mt-4  pb-4 h-[540px]"
                >
                  {filteredProducts.map((product) => (
                    <SwiperSlide key={product._id}>
                      <div className="border p-4 h-[370px] lg:h-[470px] relative shadow-sm bg-white flex flex-col rounded-sm">
                        {/* Image */}
                        <div className="flex items-center justify-center w-full aspect-square bg-[#f9f5f0]/30 rounded">
                          <Image
                            width={500}
                            height={500}
                            src={product.imageUrls[0]}
                            alt={product.name}
                            className="w-24 h-24  sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain rounded"
                          />
                        </div>

                        {/* Title */}
                        <Link href={`/products/${product._id}`}>
                          <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-2 hover:text-[#7c3f00] line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Rating */}
                        <div className="flex items-center gap-1 text-yellow-500 my-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                i < product?.averageRating
                                  ? "fill-yellow-500"
                                  : "fill-gray-300 text-gray-300"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Price + Stock */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2 mt-1 gap-2">
                          <div className="flex items-center gap-2">
                            {product?.offerPrice ? (
                              <>
                                <span className="text-[#7c3f00] font-bold text-sm sm:text-base md:text-lg">
                                  ₹{product?.offerPrice.toFixed(2)}
                                </span>
                                <span className="text-gray-400 line-through text-xs sm:text-sm">
                                  ₹{product?.price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-[#7c3f00] font-bold text-sm sm:text-base md:text-lg">
                                ₹{product?.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div
                            className={`text-[10px] sm:text-xs md:text-sm px-2 py-0.5 rounded-lg mb-4 ${
                              product.stock > 0
                                ? "bg-[#7c3f00]/20 text-black"
                                : "bg-red-100 text-red-400"
                            }`}
                          >
                            {product.stock > 0 ? "Stock" : "Out Of Stock"}
                          </div>
                        </div>

                        {/* Add To Cart */}
                        <Button
                          className="w-full mt-auto rounded-md border border-[#7c3f00] text-[#7c3f00] hover:bg-[#7c3f00]/20 bg-white flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base"
                          variant="outline"
                        >
                          <ShoppingCart className="h-4 w-4" /> Add To Cart
                        </Button>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p className="text-gray-500 mt-4">
                  No products in this category.
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default FeaturedProducts;
