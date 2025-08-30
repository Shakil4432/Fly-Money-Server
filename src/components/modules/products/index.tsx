"use client";

import ProductCard from "@/components/ui/core/ProductCard";
import { IProduct } from "@/types/product";
import React, { useState } from "react";
import FilterSidebar from "./filterSidebar";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";
import ProductToolbar from "./ProductToolbar";

const AllProducts = ({
  products,
  totalPage,
  length,
}: {
  products: IProduct[];
  totalPage: number;
  length: number;
}) => {
  const [view, setView] = useState<"grid" | "list">("grid"); // 👈 view state

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-20 px-4">
      {/* Sidebar */}
      <div className="hidden lg:block w-full lg:w-1/4 border rounded-md h-fit sticky top-24">
        <FilterSidebar />
      </div>

      {/* Main Product Section */}
      <div className="w-full lg:w-3/4">
        {/* Toolbar */}
        <div className="mb-4">
          <ProductToolbar length={length} setView={setView} view={view} />
        </div>

        {/* Product List/Grid */}
        <div
          className={`grid ${
            view == "grid"
              ? "grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4"
              : "grid-cols-1 gap-4"
          } `}
        >
          {products?.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} view={view} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center mt-8">
          <TablePagination totalPage={totalPage} />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
