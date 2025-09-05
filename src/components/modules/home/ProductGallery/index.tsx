import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const products = [
  { id: 1, name: "Product 1", image: "/product1.jpg", span: "row-span-2" },
  { id: 2, name: "Product 2", image: "/product2.jpg" },
  { id: 3, name: "Product 3", image: "/product3.jpg" },
  { id: 4, name: "Product 4", image: "/product4.jpg", span: "row-span-3" },
  { id: 5, name: "Product 5", image: "/product5.jpg" },
  { id: 6, name: "Product 6", image: "/product1.jpg" },
  { id: 7, name: "Product 7", image: "/product2.jpg", span: "row-span-2" },
  { id: 8, name: "Product 8", image: "/product3.jpg" },
];

const ProductGallery = () => {
  return (
    <div className="container w-full mx-auto p-4">
      <div className="flex  items-start justify-between py-6 md:py-10 gap-4 md:gap-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg lg:text-3xl md:text-3xl font-bold text-[#7c3f00]">
              Product Gallery
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
            Check out our most products gallery
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[300px]">
        {products.map((product) => (
          <div
            key={product.id}
            className={`relative group rounded-xl shadow-md overflow-hidden ${
              product.span || ""
            }`}
          >
            {/* Background image */}
            <div
              style={{ backgroundImage: `url(${product.image})` }}
              className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:blur-sm"
            ></div>

            {/* Overlay for product name */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition duration-500">
              <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition duration-500">
                {product.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
