"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import { IProduct } from "@/types/product";
import Link from "next/link";

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
      return <Star key={i} size={16} fill="#facc15" stroke="#facc15" />;
    } else if (rating >= i + 0.5) {
      return <StarHalf key={i} size={16} className="text-yellow-400" />;
    } else {
      return <Star key={i} size={16} stroke="#d1d5db" />;
    }
  });
};

const ProductCard = ({ product }: { product: IProduct }) => {
  const isInStock = product.stock > 0;

  return (
    <motion.div
      className="relative group overflow-hidden rounded-sm  border border-[#7c3f00]/10 bg-white shadow-sm hover:shadow-sm transition"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-[#f9f5f0]/40 overflow-hidden rounded-t-sm">
        {/* Discount Badge */}
        {product?.offerPrice && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
            {Math.round(
              ((product.price - product.offerPrice) / product.price) * 100
            )}
            %
          </span>
        )}

        <Image
          src={
            product?.imageUrls[0] ||
            "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
          }
          alt={product?.name || "Leather product image"}
          height={400}
          width={400}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Top Right Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            aria-label="Add to cart"
            disabled={!isInStock}
            className="p-2 backdrop-blur border border-[#7c3f00] text-[#7c3f00] rounded-full hover:scale-110 hover:bg-[#7c3f00] hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2 text-[#7c3f00]">
        {/* Product Name */}
        <h3
          className="text-base md:text-lg font-semibold line-clamp-2"
          title={product?.name}
        >
          {product?.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {renderStars(product.averageRating)}
        </div>

        {/* Price & Stock */}
        <div className="flex items-center justify-between mt-1">
          {/* Pricing */}
          <div className="flex items-center gap-2">
            {product?.offerPrice ? (
              <>
                <span className="text-gray-800 font-bold text-sm md:text-base">
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

          {/* Stock */}
          <span
            className={`text-[10px] md:text-xs font-medium px-2.5 py-1 rounded-full ${
              isInStock
                ? "text-[#7c3f00] bg-[#7c3f00]/10"
                : "text-red-600 border border-red-600"
            }`}
          >
            {isInStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Details Button */}
        <Link href={`/products/${product._id}`} className="w-full">
          <button
            aria-label="See product details"
            disabled={!isInStock}
            className="w-full mt-3 text-sm text-[#7c3f00] border border-[#7c3f00] py-2 rounded-full hover:scale-[1.02] hover:bg-[#5e2f00] hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            See Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
