"use client";

import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star, Menu, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/services/Category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterSidebar() {
  const [price, setPrice] = useState([0]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [{ data: categoriesData }] = await Promise.all([
          getAllCategories(),
        ]);
        setCategories(categoriesData);
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to fetch filters");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, value.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
    setPrice([0]);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-full
        bg-[#7c3f00] text-white shadow-lg hover:bg-[#9b5e00] transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-white p-6 
          shadow-2xl transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:shadow-none lg:h-auto
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#7c3f00]">Filters</h2>
          {searchParams.toString().length > 0 && (
            <Button
              onClick={clearFilters}
              size="sm"
              variant="outline"
              className="text-[#7c3f00] border-[#7c3f00] hover:bg-[#7c3f00]/10"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Price Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Price</h3>
          <Slider
            max={500}
            step={10}
            value={price}
            onValueChange={(value) => {
              setPrice(value);
              handleSearchQuery("price", value[0]);
            }}
            className="w-full [&_[data-radix-slider-range]]:bg-[#7c3f00]
            [&_[data-radix-slider-track]]:bg-gray-200"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>$0</span>
            <span>${price[0]}</span>
            <span>$500</span>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Categories
          </h3>
          {isLoading ? (
            <div className="flex items-center text-sm text-gray-500">
              <Loader2 className="animate-spin mr-2" size={16} /> Loading...
            </div>
          ) : (
            <RadioGroup className="space-y-3">
              {categories?.map((category: { _id: string; name: string }) => (
                <div key={category._id} className="flex items-center space-x-3">
                  <RadioGroupItem
                    className="border border-[#7c3f00] data-[state=checked]:bg-[#7c3f00]"
                    onClick={() =>
                      handleSearchQuery("parentCategory", category._id)
                    }
                    value={category._id}
                    id={category._id}
                  />
                  <Label
                    htmlFor={category._id}
                    className="text-gray-700 cursor-pointer hover:text-[#7c3f00] transition"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>

        {/* Rating */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Rating</h3>
          <RadioGroup className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <RadioGroupItem
                  className="border border-[#7c3f00] data-[state=checked]:bg-[#7c3f00]"
                  onClick={() => handleSearchQuery("rating", rating)}
                  value={`${rating}`}
                  id={`rating-${rating}`}
                />
                <Label
                  htmlFor={`rating-${rating}`}
                  className="flex items-center gap-1 text-gray-700 cursor-pointer hover:text-[#7c3f00] transition"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < rating ? "#facc15" : "transparent"}
                      stroke={i < rating ? "#facc15" : "#d1d5db"}
                    />
                  ))}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </aside>
    </>
  );
}
