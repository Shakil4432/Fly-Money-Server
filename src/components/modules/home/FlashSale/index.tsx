// import { Button } from "@/components/ui/button";
// import NMContainer from "@/components/ui/core/NMContainer";
// import ProductCard from "@/components/ui/core/ProductCard";
// import { getFlashSaleProducts } from "@/services/FlashSale";

// import Link from "next/link";
// import { IProduct } from "@/types/product";
// import CountDown from "./CountDown";

// const FlashSale = async () => {
//   const { data: products } = await getFlashSaleProducts();
//   console.log(products);

//   return (
//     <div className="text-[#7c3f00] bg-opacity-50 mt-32 p-5  pt-6 pb-8 bg-[#FAF0E6]/10">
//       <NMContainer className="my-16">
//         {/* Header section */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//           <div className="flex flex-col flex-wrap sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
//             <h2 className="text-2xl sm:text-3xl font-bold">Flash Sale</h2>
//             <CountDown />
//           </div>

//           <Link href="/products">
//             <Button
//               variant="outline"
//               className="rounded-full text-[#7c3f00] hover:text-[#facc15] bg-[#FAF0E6] border-[#7c3f00] font-bold hover:font-extrabold hover:bg-[#FAF0E6]"
//             >
//               All Collection
//             </Button>
//           </Link>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
//           {products?.slice(0, 4)?.map((product: IProduct, idx: number) => (
//             <ProductCard key={idx} product={product} />
//           ))}
//         </div>
//       </NMContainer>
//     </div>
//   );
// };

// export default FlashSale;

// "use client";

// import { useEffect, useState } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import { Card, CardContent } from "@/components/ui/card";
// import NMContainer from "@/components/ui/core/NMContainer";
// import Image from "next/image";
// import Link from "next/link";
// import Category3 from "../../shop/category/Category3";
// import { Button } from "@/components/ui/button";

// import { ShoppingCart } from "lucide-react";

// const PRIMARY = "#7c3f00";

// const FeaturedProducts = ({
//   products,
//   title = "Featured Products",
// }: ProductSliderProps) => {
//   const [emblaRef] = useEmblaCarousel({ loop: false, align: "start" });
//   console.log(products);

//   return (
//     <section className="relative overflow-hidden mt-24 flex items-center justify-center">
//       <NMContainer className="relative z-10">
//         <div className="flex items-center justify-between">
//           <div className="space-y-2 pt-4">
//             <h1 className=" text-3xl font-bold text-[#7c3f00] ">
//               Featured Product
//             </h1>
//             <p className="text-gray-500">Do not miss the current offers</p>
//           </div>
//           <div>
//              <Category3 color="bg-white"></Category3>
//           </div>
//         </div>
//         <div className="overflow-hidden mt-10" ref={emblaRef}>
//           <div className="flex gap-4">
//             {products.map((product) => (
//               <div key={product._id} className="min-w-[250px] flex-shrink-0">
//                 {/* <Link href={`/products/${product.slug}`}> */}
//                 <Card className="h-96 w-64 flex flex-col bg-white border hover:shadow-lg transition rounded-sm">
//                   <CardContent className="flex flex-col items-center justify-between p-4 h-full">
//                     <Image
//                       src={product.imageUrls[0]}
//                       alt={product.name}
//                       width={200}
//                       height={160}
//                       className="object-contain w-full h-40 mb-4"
//                     />
//                     <h3
//                       className="text-base text-left  w-full font-semibold"
//                       style={{ color: PRIMARY }}
//                     >
//                       {product.name}
//                     </h3>
//                     <div className=" flex w-full items-center  justify-between space-y-1 ">
//                       <div className="text-lg font-bold text-gray-500">
//                         ${product.price}
//                       </div>
//                       <div
//                         className={`text-sm bg-[#7c3f00]/30 px-2 rounded-lg ${
//                           product.stock > 0 ? "text-black" : "text-red-400"
//                         }`}
//                       >
//                         {product.stock > 0 ? "stock" : "Out Of Stock"}
//                       </div>
//                     </div>
//                     <Button
//                       className="w-full border border-[#7c3f00] text-[#7c3f00] bg-white"
//                       variant="outline"
//                     >
//                       <ShoppingCart></ShoppingCart>
//                       Add To Cart
//                     </Button>
//                   </CardContent>
//                 </Card>
//                 {/* </Link> */}
//               </div>
//             ))}
//           </div>
//         </div>
//       </NMContainer>
//     </section>
//   );
// };

// export default FeaturedProducts;
"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICategory } from "@/types/category";
import { IProduct } from "@/types/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import CountDown from "./CountDown";
import { useAppDispatch } from "@/Redux/hooks";
import { addProduct } from "@/Redux/features/cartSlice";

interface FeaturedProductsProps {
  ParentCategories: ICategory[];
  products: IProduct[];
  title?: string;
}

const FlashSale = ({
  ParentCategories,
  products,
  title = "FlashSale",
}: FeaturedProductsProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    "all"
  );
  const [defaultTab, setDefaultTab] = useState<string>("all");

  const dispatch = useAppDispatch();

  const handleAddProduct = (product: IProduct) => {
    dispatch(addProduct(product));
  };

  useEffect(() => {
    if (ParentCategories.length > 0) {
      setDefaultTab("all"); // Default tab is ALL
    }
  }, [ParentCategories]);

  const filteredProducts =
    selectedCategoryId === "all"
      ? products
      : products.filter(
          (product: any) => product.parentCategory === selectedCategoryId
        );

  return (
    <div className="container mx-auto mt-32">
      {defaultTab && (
        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="flex items-center justify-between py-10">
            <div>
              <div className="flex items-center justify-between gap-10">
                <h2 className="text-3xl font-bold text-[#7c3f00]">{title}</h2>
                <CountDown />
              </div>
            </div>

            <div>
              <TabsList className="flex items-end mb-2 bg-white">
                {/* ALL tab */}
                <TabsTrigger
                  value="all"
                  onClick={() => setSelectedCategoryId("all")}
                  className="font-medium data-[state=active]:shadow-sm data-[state=active]:bg-white px-6 text-gray-600 data-[state=active]:text-[#7c3f00] data-[state=active]:border-b data-[state=active]:border-red-500 data-[state=active]:font-semibold py-2 transition"
                >
                  ALL
                </TabsTrigger>

                {/* Category tabs */}
                {ParentCategories.map((cat) => (
                  <TabsTrigger
                    key={cat._id}
                    value={cat.name}
                    onClick={() => setSelectedCategoryId(cat._id)}
                    className="font-medium data-[state=active]:shadow-sm data-[state=active]:bg-white px-6 text-gray-600 data-[state=active]:text-[#7c3f00] data-[state=active]:border-b data-[state=active]:border-red-500 data-[state=active]:font-semibold py-2 transition"
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
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                  1280: { slidesPerView: 5 },
                }}
                modules={[Navigation]}
                className="mt-4"
              >
                {products.map((product) => (
                  <SwiperSlide key={product._id}>
                    <div className="border p-4 rounded shadow-sm bg-white h-full ">
                      <div className="flex items-center justify-center w-full h-40 bg-[#f9f5f0]/30">
                        <img
                          src={product.imageUrls[0]}
                          alt={product.name}
                          className="w-36 h-36 object-cover rounded"
                        />
                      </div>
                      <Link href={`/products/${product._id}`}>
                        <h3 className="text-lg font-semibold mt-2 hover:text-[#7c3f00]">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="text-gray-500 font-bold mt-1 line-through">
                            ${Math.ceil(product?.price)}
                          </p>
                          <p className="text-[#7c3f00] font-bold mt-1">
                            ${Math.ceil(product?.offerPrice)}
                          </p>
                        </div>
                        <div
                          className={`text-sm bg-[#7c3f00]/30 px-2 rounded-lg ${
                            product.stock > 0 ? "text-black" : "text-red-400"
                          }`}
                        >
                          {product.stock > 0 ? "stock" : "Out Of Stock"}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleAddProduct(product)}
                        className="w-full border border-[#7c3f00] !rounded-none text-[#7c3f00] hover:bg-[#7c3f00]/30 bg-white mt-4"
                        variant="outline"
                      >
                        <ShoppingCart />
                        Add To Cart
                      </Button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className="text-gray-500 mt-4">No products available.</p>
            )}
          </TabsContent>

          {/* Category-specific contents */}
          {ParentCategories.map((cat) => (
            <TabsContent key={cat._id} value={cat.name}>
              {filteredProducts.length > 0 ? (
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                  }}
                  modules={[Navigation]}
                  className="mt-4"
                >
                  {filteredProducts.map((product) => (
                    <SwiperSlide key={product._id}>
                      <div className="border p-4 rounded shadow-sm bg-white h-full">
                        <div className="flex items-center justify-center w-full h-40 bg-[#f9f5f0]/30">
                          <img
                            src={product.imageUrls[0]}
                            alt={product.name}
                            className="w-36 h-36 object-cover rounded"
                          />
                        </div>
                        <Link href={`/products/${product._id}`}>
                          <h3 className="text-lg font-semibold mt-2 hover:text-[#7c3f00]">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <p className="text-[#7c3f00] font-bold mt-1">
                              ${Math.ceil(product?.offerPrice)}
                            </p>
                            <p className="text-gray-500 font-bold mt-1 line-through">
                              ${Math.ceil(product?.price)}
                            </p>
                          </div>
                          <div
                            className={`text-sm bg-[#7c3f00]/30 px-2 rounded-lg ${
                              product.stock > 0 ? "text-black" : "text-red-400"
                            }`}
                          >
                            {product.stock > 0 ? "stock" : "Out Of Stock"}
                          </div>
                        </div>
                        <Button
                          onClick={() => handleAddProduct(product)}
                          className="w-full border border-[#7c3f00] !rounded-none text-[#7c3f00] hover:bg-[#7c3f00]/30 bg-white mt-4"
                          variant="outline"
                        >
                          <ShoppingCart />
                          Add To Cart
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

export default FlashSale;
