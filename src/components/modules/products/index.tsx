import ProductCard from "@/components/ui/core/ProductCard";
import { IProduct } from "@/types/product";
import React from "react";
import FilterSidebar from "./filterSidebar";

const AllProducts = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 py-10 px-4">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4">
        <FilterSidebar />
      </div>

      {/* Product Grid */}
      <div className="w-full lg:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
