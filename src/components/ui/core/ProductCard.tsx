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
    boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
    transition: { duration: 0.3 },
  },
};

const ProductCard = ({ product }: { product: IProduct }) => {
  const isInStock = product.stock > 0;

  return (
    <motion.div
      className="relative group rounded-xl overflow-hidden bg-[#090807] border border-[#333] shadow-md transition-all duration-300"
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
          className="object-cover w-full h-full"
        />

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button className="p-2 bg-black text-[#7c3f00] rounded-full hover:bg-gray-300 border border-[#7c3f00] transition">
            <Heart size={16} />
          </button>
          <button
            disabled={!isInStock}
            className="p-2 bg-[#7c3f00] text-black rounded-full  transition disabled:opacity-40"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4 text-[#fef9c3]">
        <h3 className="text-lg font-semibold truncate" title={product?.name}>
          {product?.name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product?.offerPrice ? (
              <>
                <span className="text-[#facc15] font-bold text-base">
                  $ {product.offerPrice}
                </span>
                <del className="text-gray-400 text-sm">${product.price}</del>
              </>
            ) : (
              <span className="text-[#fef9c3] font-semibold text-base">
                $ {product.price}
              </span>
            )}
          </div>

          {/* Stock status */}
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              isInStock ? "text-[#7c3f00]" : "text-red-600"
            }`}
          >
            {isInStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Buy Now Button */}
        <Link href={`/products/${product._id}`}>
          <button
            disabled={!isInStock}
            className="w-full mt-4 text-sm bg-[#7c3f00] text-white py-2 rounded-full hover:bg-[#92400e] disabled:opacity-40"
          >
            See Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
