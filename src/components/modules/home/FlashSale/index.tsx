"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICategory } from "@/types/category";
import { IProduct } from "@/types/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import CountDown from "./CountDown";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useAppDispatch } from "@/Redux/hooks";
import { addProduct } from "@/Redux/features/cartSlice";
import { toast } from "sonner";

interface FeaturedProductsProps {
  ParentCategories: ICategory[];
  products: IProduct[];
  title?: string;
}

const FlashSale = ({
  ParentCategories,
  products,
  title = "Flash Sale",
}: FeaturedProductsProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    "all"
  );
  const [defaultTab, setDefaultTab] = useState<string>("all");

  useEffect(() => {
    if (ParentCategories.length > 0) {
      setDefaultTab("all");
    }
  }, [ParentCategories]);

  const filteredProducts =
    selectedCategoryId === "all"
      ? products
      : products.filter(
          (product: any) => product.parentCategory === selectedCategoryId
        );

  // Framer Motion Variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.11, duration: 0.5, ease: "easeOut" }, // staggered delay
    }),
    hover: { scale: 1.03, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const dispatch = useAppDispatch();

  const handleAddToProduct = (product: IProduct) => {
    dispatch(addProduct(product));
    toast.success(`${product.name} add to cart`);
  };

  return (
    <div className="container mx-auto   px-4 md:px-0">
      {defaultTab && (
        <Tabs defaultValue={defaultTab} className="w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-6 md:py-10 gap-4 md:gap-0">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 w-full ">
              <h2 className="text-lg lg:w-[26%]  lg:text-3xl md:text-3xl font-bold text-[#7c3f00]">
                {title}
              </h2>
              <CountDown />
            </div>

            {/* Tabs */}
            <div className="w-full md:w-auto">
              <TabsList className="flex items-center justify-start gap-6 bg-white border-gray-200 overflow-x-auto md:overflow-visible scrollbar-hide">
                <TabsTrigger
                  value="all"
                  onClick={() => setSelectedCategoryId("all")}
                  className="whitespace-nowrap text-xs lg:text-sm font-medium text-gray-600 
                    data-[state=active]:text-[#7c3f00] data-[state=active]:border-b-1
                    data-[state=active]:border-[#7c3f00] data-[state=active]:font-semibold 
                    py-1 px-2 lg:py-2 lg:px-3 transition"
                >
                  ALL
                </TabsTrigger>

                {ParentCategories.slice(0, 5).map((cat) => (
                  <TabsTrigger
                    key={cat._id}
                    value={cat.name}
                    onClick={() => setSelectedCategoryId(cat._id)}
                    className="whitespace-nowrap text-xs lg:text-sm font-medium text-gray-600 
                      data-[state=active]:text-[#7c3f00] data-[state=active]:border-b-1
                      data-[state=active]:border-[#7c3f00] data-[state=active]:font-semibold 
                     py-1 px-2 lg:py-2 lg:px-3 transition"
                  >
                    {cat.name.toUpperCase()}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          {/* ALL Tab Content */}
          <TabsContent value="all">
            {products.length > 0 ? (
              <motion.div
                variants={tabVariants}
                initial="hidden"
                animate="visible"
              >
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={16}
                  slidesPerView={2}
                  loop
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    reverseDirection: true,
                  }}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                  }}
                  className="mt-4 pb-4 h-[370px] lg:h-[470px]"
                >
                  {products.map((product, index) => (
                    <SwiperSlide key={product._id}>
                      <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true, amount: 0.3 }} // animates only when ~30% visible
                        custom={index} // used for stagger delay
                        className="border h-[320px] lg:h-[400px] relative shadow-sm bg-white flex flex-col rounded-sm"
                      >
                        {/* Image */}
                        <div className="relative w-full h-56 aspect-square bg-[#f9f5f0]/30 overflow-hidden">
                          <Image
                            src={
                              product?.imageUrls[0] ||
                              "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                            }
                            alt={product?.name || "Leather product image"}
                            height={400}
                            width={400}
                            className="w-full h-full object-cover rounded-t-sm transition-transform duration-300 hover:scale-105"
                          />
                        </div>

                        {/* Title */}
                        <Link href={`/products/${product._id}`}>
                          <h3 className="text-sm px-4 sm:text-base md:text-lg font-semibold mt-2 hover:text-[#7c3f00] line-clamp-2 truncate">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Rating */}
                        <div className="flex px-4 items-center gap-1 text-yellow-500 my-1">
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

                        {/* Price */}
                        <div className="flex px-4 flex-col sm:flex-row items-start sm:items-center justify-between sm:gap-2 mt-1 gap-2">
                          <div className="flex items-center gap-2 w-full justify-between">
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
                        </div>

                        {/* Add To Cart */}
                        <div className="p-4 mt-auto">
                          <Button
                            onClick={() => handleAddToProduct(product)}
                            className="w-full rounded-md border border-[#7c3f00] text-[#7c3f00] hover:bg-[#7c3f00]/20 bg-white flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base"
                            variant="outline"
                          >
                            <ShoppingCart className="h-4 w-4" /> Add To Cart
                          </Button>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            ) : (
              <p className="text-gray-500 mt-4">No products available.</p>
            )}
          </TabsContent>

          {/* Category Tabs */}
          {ParentCategories.map((cat) => (
            <TabsContent key={cat._id} value={cat.name}>
              {filteredProducts.length > 0 ? (
                <motion.div
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={16}
                    slidesPerView={2}
                    loop
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                      reverseDirection: true,
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                      640: { slidesPerView: 2 },
                      768: { slidesPerView: 3 },
                      1024: { slidesPerView: 4 },
                      1280: { slidesPerView: 5 },
                    }}
                    className="mt-4 pb-4 h-[370px] lg:h-[470px]"
                  >
                    {filteredProducts.map((product, index) => (
                      <SwiperSlide key={product._id}>
                        <motion.div
                          variants={cardVariants}
                          initial="hidden"
                          whileInView="visible"
                          whileHover="hover"
                          viewport={{ once: true, amount: 0.3 }} // animates only when ~30% visible
                          custom={index} // used for stagger delay
                          className="border h-[320px] lg:h-[400px] relative shadow-sm bg-white flex flex-col rounded-sm"
                        >
                          {/* Image */}
                          <div className="relative w-full h-56 aspect-square bg-[#f9f5f0]/30 overflow-hidden">
                            <Image
                              src={
                                product?.imageUrls[0] ||
                                "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                              }
                              alt={product?.name || "Leather product image"}
                              height={400}
                              width={400}
                              className="w-full h-full object-cover rounded-t-sm transition-transform duration-300 hover:scale-105"
                            />
                          </div>

                          {/* Title */}
                          <Link href={`/products/${product._id}`}>
                            <h3 className="text-sm px-4 sm:text-base md:text-lg font-semibold mt-2 hover:text-[#7c3f00] line-clamp-2 truncate">
                              {product.name}
                            </h3>
                          </Link>

                          {/* Rating */}
                          <div className="flex px-4 items-center gap-1 text-yellow-500 my-1">
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

                          {/* Price */}
                          <div className="flex px-4 flex-col sm:flex-row items-start sm:items-center justify-between sm:gap-2 mt-1 gap-2">
                            <div className="flex items-center gap-2 w-full justify-between">
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
                          </div>

                          {/* Add To Cart */}
                          <div className="p-4 mt-auto">
                            <Button
                              onClick={() => handleAddToProduct(product)}
                              className="w-full rounded-md border border-[#7c3f00] text-[#7c3f00] hover:bg-[#7c3f00]/20 bg-white flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base"
                              variant="outline"
                            >
                              <ShoppingCart className="h-4 w-4" /> Add To Cart
                            </Button>
                          </div>
                        </motion.div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>
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

export default FlashSale;
