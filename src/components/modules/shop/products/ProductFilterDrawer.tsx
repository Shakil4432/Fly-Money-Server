"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { FilterIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { getParentCategores } from "@/services/Category";

interface ICategory {
  _id: string;
  name: string;
  description: string;
  parent: string | null;
  isActive: boolean;
  createdBy: string;
  icon: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  children: ICategory[];
}

type FilterValues = {
  parentCategory?: string;
  subCategory?: string;
  thirdSubCategory?: string;
  brand?: string;
  status?: string;
  minStock?: number[];
  minPrice?: number[];
  maxPrice?: number[];
  minOfferPrice?: number[];
  maxOfferPrice?: number[];
  rating?: string;
  color?: string;
  sort?: string;
};

const ProductFilterDrawer = ({
  onApply,
  handleSearchQuery,
}: {
  handleSearchQuery: (key: string, value: string | number | boolean) => void;
  onApply: (filters: FilterValues) => void;
}) => {
  const [open, setOpen] = useState(false);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");
  const [thirdSubCategory, setThirdSubCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [status, setStatus] = useState("All");
  const [minStock, setMinStock] = useState([0]);
  const [minPrice, setMinPrice] = useState([0]);
  const [maxPrice, setMaxPrice] = useState([1]);
  const [minOfferPrice, setMinOfferPrice] = useState([0]);
  const [maxOfferPrice, setMaxOfferPrice] = useState([1]);
  const [rating, setRating] = useState("All");
  const [color, setColor] = useState("All");
  const [sort, setSort] = useState("");

  const router = useRouter();
  const pathName = usePathname();

  const applyFilters = () => {
    onApply({
      parentCategory: category,
      subCategory,
      thirdSubCategory,
      brand,
      status,
      minStock,
      minPrice,
      maxPrice,
      minOfferPrice,
      maxOfferPrice,
      rating,
      color,
      sort,
    });
    setOpen(false);
  };

  const clearFilters = () => {
    setCategory("All");
    setSubCategory("All");
    setThirdSubCategory("All");
    setBrand("All");
    setStatus("All");
    setMinStock([0]);
    setMinPrice([0]);
    setMaxPrice([1]);
    setMinOfferPrice([0]);
    setMaxOfferPrice([1]);
    setRating("All");
    setColor("All");
    setSort("");
    router.push(pathName, { scroll: false });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getParentCategores();
      setCategories(res.data || []);
    };
    fetchCategories();
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-white border rounded-sm">
          <FilterIcon className="text-[#7c3f00]" />
          Filter
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
        </SheetHeader>

        {/* Category */}
        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select
            value={category}
            onValueChange={(val) => {
              setCategory(val);
              handleSearchQuery("parentCategory", val);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c._id} value={c._id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-semibold  my-2 ">Price</h2>
          <div className="flex items-center justify-between text-sm mb-2 ">
            <span>$0</span>
            <span>$500</span>
          </div>
          <Slider
            max={500}
            step={1}
            onValueChange={(value) => {
              setMinPrice(value);
              handleSearchQuery("price", value[0]);
            }}
            className="w-full"
          />
          <p className="text-sm mt-2 ">Selected Price: ${minPrice[0]}</p>
        </div>

        {/* Stock */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold  my-2 ">Stock</h2>
          <div className="flex items-center justify-between text-sm mb-2 ">
            <span>$0</span>
            <span>$500</span>
          </div>
          <Slider
            max={500}
            step={1}
            onValueChange={(value) => {
              setMinStock(value);
              handleSearchQuery("stock", value[0]);
            }}
            className="w-full"
          />
          <p className="text-sm mt-2 ">Selected Stock: ${minStock[0]}</p>
        </div>

        {/* Ratings */}
        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium">Minimum Rating</label>
          <Select
            value={rating}
            onValueChange={(val) => {
              setRating(val);
              handleSearchQuery("rating", val);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {[1, 2, 3, 4, 5].map((r) => (
                <SelectItem key={r} value={r.toString()}>
                  {r} ★ & Up
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Colors */}

        {/* Sort */}
        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium">Sort By</label>
          <Select
            value={sort}
            onValueChange={(val) => {
              setSort(val);
              handleSearchQuery("sort", val);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Default</SelectItem>
              <SelectItem value="-createdAt">Newest First</SelectItem>
              <SelectItem value="createdAt">Oldest First</SelectItem>
              <SelectItem value="price">Price Low → High</SelectItem>
              <SelectItem value="-price">Price High → Low</SelectItem>
              <SelectItem value="-averageRating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <SheetFooter className="mt-6 flex gap-2">
          <Button
            className="w-full bg-[#7c3f00] hover:bg-[#7c3f00]/60"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full" onClick={clearFilters}>
            Clear
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProductFilterDrawer;
