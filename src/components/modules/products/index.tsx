"use client";

import ProductCard from "@/components/ui/core/ProductCard";
import { IProduct } from "@/types/product";
import React, { useState } from "react";
import FilterSidebar from "./filterSidebar";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";
import ProductToolbar from "./ProductToolbar";
import { Menu, X } from "lucide-react";
import FilterSidebarForMobile from "./FilterSIdebarForMobile";

const AllProducts = ({
  products,
  totalPage,
  length,
}: {
  products: IProduct[];
  totalPage: number;
  length: number;
}) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Mobile Filter Button */}
      <div className="mx-4 my-4 ">
        <div className="flex items-center px-2 w-full shadow-sm border bg-slate-100 rounded-md ">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-3 w-full md:w-[260px] rounded-md transition"
          >
            <div className="px-2 py-3 flex items-center justify-center gap-4 lg:hidden text-[#7c3f00] rounded-md">
              <Menu size={18} /> Filter
            </div>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-4">
        {/* Sidebar (Desktop) */}
        <div className="hidden lg:block w-full lg:w-1/4 border rounded-md h-fit sticky top-24">
          <FilterSidebar />
        </div>

        {/* Sidebar Drawer (Mobile) */}
        {sidebarOpen && (
          <div
            className={`fixed inset-0 z-50 flex transition ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <FilterSidebarForMobile
              setSidebarOpen={setSidebarOpen}
              sidebarOpen={sidebarOpen}
            />
          </div>
        )}

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
    </div>
  );
};

export default AllProducts;
