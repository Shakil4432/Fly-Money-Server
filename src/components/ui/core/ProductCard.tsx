"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  StarHalf,
  Star as StarOutline,
} from "lucide-react";
import Image from "next/image";
import { IProduct } from "@/types/product";
import Link from "next/link";

const cardVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    transition: { duration: 0.3 },
  },
};

// Helper function to render stars
const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <Star
          size={18}
          key={i}
          fill={i <= rating ? "orange" : "lightgray"}
          stroke={i <= rating ? "orange" : "lightgray"}
          className="text-yellow-500"
        />
      );
    } else if (rating >= i - 0.5) {
      stars.push(<StarHalf key={i} className="text-yellow-500" size={16} />);
    } else {
      stars.push(<StarOutline key={i} className="text-gray-300" size={16} />);
    }
  }
  return stars;
};

const ProductCard = ({ product }: { product: IProduct }) => {
  const isInStock = product.stock > 0;

  return (
    <motion.div
      className="relative group overflow-hidden text-[#7c3f00] rounded-2xl transition border border-[#7c3f00]/10 duration-300"
      variants={cardVariants}
      initial="rest"
      animate="rest"
    >
      {/* Product Image */}
      <div className="relative w-full h-40 bg-[#f9f5f0]/30 p-3">
        <Image
          src={
            product?.imageUrls[0] ||
            "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
          }
          alt={product?.name || "Leather product image"}
          height={500}
          width={500}
          className="w-36 h-32 object-cover rounded items-center justify-center mx-auto"
        />

        {/* Top Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button
            disabled={!isInStock}
            className="p-2 backdrop-blur border border-[#7c3f00] text-[#7c3f00] rounded-full hover:bg-[#7c3f00] hover:text-white transition"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2 text-[#7c3f00]">
        {/* Product Name */}
        <h3 className="text-lg font-semibold truncate" title={product?.name}>
          {product?.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {renderStars(product.averageRating)}
        </div>

        {/* Price & Stock */}
        <div className="flex items-center justify-between">
          {/* Pricing */}
          <div className="flex items-center gap-2">
            {product?.offerPrice ? (
              <>
                <span className="text-gray-600 font-bold text-base">
                  ${product.offerPrice}
                </span>
                <del className="text-sm text-gray-400">${product.price}</del>
              </>
            ) : (
              <span className="text-base font-semibold text-gray-500">
                ${product.price}
              </span>
            )}
          </div>

          {/* Stock */}
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              isInStock
                ? "text-[#7c3f00] bg-[#7c3f00]/10"
                : "text-red-600 border border-red-600"
            }`}
          >
            {isInStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Details Button */}
        <Link href={`/products/${product._id}`}>
          <button
            disabled={!isInStock}
            className="w-full mt-3 text-sm text-[#7c3f00] border border-[#7c3f00] py-2 rounded-full hover:bg-[#5e2f00] hover:text-white transition disabled:opacity-40"
          >
            See Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
