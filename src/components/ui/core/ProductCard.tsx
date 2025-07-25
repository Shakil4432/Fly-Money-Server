"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
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

const ProductCard = ({ product }: { product: IProduct }) => {
  const isInStock = product.stock > 0;

  return (
    <motion.div
      className="relative group rounded-2xl overflow-hidden bg-[#0b0b0b] border border-[#262626] transition-all duration-300"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Product Image */}
      <div className="relative h-64 w-full">
        <Image
          src={
            product?.imageUrls[0] ||
            "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
          }
          alt={product?.name || "Leather product image"}
          fill
          className="object-cover w-full h-full rounded-t-2xl"
        />

        {/* Top Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button className="p-2 bg-black/70 backdrop-blur border border-[#7c3f00] text-[#facc15] rounded-full hover:bg-[#7c3f00] hover:text-white transition">
            <Heart size={16} />
          </button>
          <button
            disabled={!isInStock}
            className="p-2 bg-[#7c3f00] text-white rounded-full transition disabled:opacity-40 hover:bg-[#5e2f00]"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4 text-[#fefce8]">
        {/* Product Name */}
        <h3 className="text-lg font-semibold truncate" title={product?.name}>
          {product?.name}
        </h3>

        {/* Price & Stock */}
        <div className="flex items-center justify-between">
          {/* Pricing */}
          <div className="flex items-center gap-2">
            {product?.offerPrice ? (
              <>
                <span className="text-[#facc15] font-bold text-base">
                  ${product.offerPrice}
                </span>
                <del className="text-sm text-gray-400">${product.price}</del>
              </>
            ) : (
              <span className="text-base font-semibold text-[#fef9c3]">
                ${product.price}
              </span>
            )}
          </div>

          {/* Stock */}
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              isInStock
                ? "text-[#7c3f00] bg-[#1c1c1c] border border-[#7c3f00]"
                : "text-red-600 bg-[#1c1c1c] border border-red-600"
            }`}
          >
            {isInStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Details Button */}
        <Link href={`/products/${product._id}`}>
          <button
            disabled={!isInStock}
            className="w-full mt-3 text-sm bg-[#7c3f00] text-white py-2 rounded-full hover:bg-[#5e2f00] transition disabled:opacity-40"
          >
            See Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
