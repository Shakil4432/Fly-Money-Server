"use client";

import { List, Grid2x2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProductToolbar({ length }: { length: number }) {
  const [sort, setSort] = useState<string>("All");
  const [view, setView] = useState<"list" | "grid">("grid"); // 👈 NEW state
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearchQuery = (key: string, value: string | number | boolean) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams: Record<string, string> = {
      ...currentParams,
      [key]: value.toString(),
    };
    Object.keys(updatedParams).forEach((k) => {
      if (updatedParams[k] === "" || updatedParams[k] === "All")
        delete updatedParams[k];
    });
    const queryString = new URLSearchParams(updatedParams).toString();
    router.push(`${pathName}?${queryString}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-md px-4 py-2 shadow-sm border">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* List View Button */}
        <button
          onClick={() => setView("list")}
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            view === "list"
              ? "bg-red-100 text-red-500"
              : "hover:bg-gray-200 text-gray-600"
          }`}
        >
          <List className="h-4 w-4" />
        </button>

        {/* Grid View Button */}
        <button
          onClick={() => setView("grid")}
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            view === "grid"
              ? "bg-red-100 text-red-500"
              : "hover:bg-gray-200 text-gray-600"
          }`}
        >
          <Grid2x2 className="h-4 w-4" />
        </button>

        {/* Product Count */}
        <p className="text-sm text-gray-700">There are {length} products.</p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Sort By</span>
        <Select
          value={sort}
          onValueChange={(val) => {
            setSort(val);
            handleSearchQuery("sort", val);
          }}
          defaultValue="All"
        >
          <SelectTrigger className="w-[160px] h-8 text-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white text-gray-500">
            <SelectValue placeholder="Sort option" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="All">Default</SelectItem>
            <SelectItem value="-createdAt">Newest First</SelectItem>
            <SelectItem value="createdAt">Oldest First</SelectItem>
            <SelectItem value="price">Price Low → High</SelectItem>
            <SelectItem value="-price">Price High → Low</SelectItem>
            <SelectItem value="-averageRating">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
