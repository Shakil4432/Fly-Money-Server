import ProductCard from "@/components/ui/core/ProductCard";
import { IProduct } from "@/types/product";
import React from "react";
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
  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-20 px-4">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 border rounded-md">
        <FilterSidebar />
      </div>

      {/* Product Grid */}
      <div className="w-full lg:w-3/4">
        <div>
          <ProductToolbar length={length}></ProductToolbar>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          {products?.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
        <div>
          <TablePagination totalPage={totalPage}></TablePagination>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
