"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/product";

const cardVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
    transition: { duration: 0.3 },
  },
};

// ⭐ Helper to render stars
const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => {
    if (rating >= i + 1) {
      return (
        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
      );
    } else if (rating >= i + 0.5) {
      return <StarHalf key={i} size={16} className="text-yellow-400" />;
    } else {
      return <Star key={i} size={16} className="text-gray-300" />;
    }
  });
};

const ProductCard = ({
  product,
  view,
}: {
  product: IProduct;
  view: string;
}) => {
  const isInStock = product.stock > 0;

  return (
    <motion.div
      className={`relative group overflow-hidden rounded-sm border border-[#7c3f00]/10 bg-white shadow-sm hover:shadow-md transition 
        ${view === "list" ? "flex flex-col md:flex-row w-full" : ""}`}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
    >
      {/* Product Image */}
      <div
        className={`relative ${
          view === "list"
            ? "w-full md:w-1/3 lg:w-1/4 flex-shrink-0"
            : "w-full h-56"
        } aspect-square bg-[#f9f5f0]/40 overflow-hidden rounded-t-sm `}
      >
        {/* Discount Badge */}
        {product?.offerPrice && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
            {Math.round(
              ((product.price - product.offerPrice) / product.price) * 100
            )}
            % OFF
          </span>
        )}

        <Image
          src={
            product?.imageUrls?.[0] ||
            "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
          }
          alt={product?.name || "Product image"}
          height={400}
          width={400}
          className={`${
            view === "list" ? "h-full w-full object-cover" : "w-full h-full"
          } transition-transform duration-300 group-hover:scale-105`}
        />

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            type="button"
            aria-label="Add to cart"
            disabled={!isInStock}
            className="p-2 backdrop-blur border border-[#7c3f00] text-[#7c3f00] rounded-full hover:scale-110 hover:bg-[#7c3f00] hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div
        className={`p-4 flex flex-col gap-2  flex-1 ${
          view === "list" ? "justify-between" : ""
        }`}
      >
        {/* Product Name */}
        <h3
          className="text-base md:text-lg text-[#7c3f00] font-semibold line-clamp-2 truncate"
          title={product?.name}
        >
          {product?.name}
        </h3>
        <h3
          className={`text-sm lg:text-sm md:text-lg text-gray-400  line-clamp-2 ${
            view == "list" ? "block" : "hidden"
          }`}
          title={product?.description}
        >
          {product?.description}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {renderStars(product.averageRating || 0)}
        </div>

        {/* Price & Stock */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            {product?.offerPrice ? (
              <>
                <span className="text-[#7c3f00] font-bold text-sm md:text-base">
                  ${product.offerPrice}
                </span>
                <del className="text-xs md:text-sm text-gray-400">
                  ${product.price}
                </del>
              </>
            ) : (
              <span className="text-sm md:text-base font-semibold text-gray-700">
                ${product.price}
              </span>
            )}
          </div>
        </div>

        {/* Details Button */}
        <Link href={`/products/${product._id}`} className="w-full">
          <button
            type="button"
            aria-label="See product details"
            disabled={!isInStock}
            className="w-full mt-3 text-sm text-[#7c3f00] border border-[#7c3f00] py-2 rounded-sm hover:scale-[1.02] hover:bg-[#5e2f00] hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            See Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
