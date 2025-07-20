"use client";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/services/Category";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterSidebar() {
  const [price, setPrice] = useState([0]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // For mobile toggle

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
      {/* Hamburger button - visible only on small screens */}
      <button
        className="
          lg:hidden
          fixed top-auto left-4 z-50 p-3 rounded-full
          bg-[#7c3f00] text-white shadow-md
          hover:bg-[#9b5e00] transition
          flex items-center justify-center
        "
        aria-label="Toggle Filters"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "" : <Menu size={24} />}
      </button>
      <div className="fixed top-12 left-4 z-50 text-xs text-white font-semibold pointer-events-none lg:hidden">
        Filters
      </div>

      {/* Sidebar container */}
      <div
        className={`
         
          fixed top-0  left-0 h-full bg-[#7c3f00] p-6 w-64
          rounded-tr-lg rounded-br-lg
          shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:h-auto lg:rounded-md lg:shadow-none lg:w-64 lg:block
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Filter</h2>
          {/* Clear Filters button visible only if query params exist */}
          {searchParams.toString().length > 0 && (
            <Button
              onClick={clearFilters}
              size="sm"
              className="bg-black hover:bg-gray-700 ml-5"
            >
              Clear Filters
            </Button>
          )}
          {/* Close button on mobile inside sidebar */}
          <button
            className="lg:hidden text-white hover:text-gray-300 ml-auto"
            aria-label="Close Filters"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Filter by Price */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-white">Price</h2>
          <div className="flex items-center justify-between text-sm mb-2 text-white">
            <span>$0</span>
            <span>$500000</span>
          </div>
          <Slider
            max={500000}
            step={1}
            onValueChange={(value) => {
              setPrice(value);
              handleSearchQuery("price", value[0]);
            }}
            className="w-full"
          />
          <p className="text-sm mt-2 text-white">Selected Price: ${price[0]}</p>
        </div>

        {/* Product Types */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-white">
            Product Category
          </h2>
          {!isLoading && (
            <RadioGroup className="space-y-2">
              {categories?.map((category: { _id: string; name: string }) => (
                <div key={category._id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    onClick={() => handleSearchQuery("category", category._id)}
                    value={category._id}
                    id={category._id}
                  />
                  <Label
                    htmlFor={category._id}
                    className="text-gray-200 font-light"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>

        {/* Rating */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-white">Rating</h2>
          <RadioGroup className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <RadioGroupItem
                  onClick={() => handleSearchQuery("rating", rating)}
                  value={`${rating}`}
                  id={`rating-${rating}`}
                />
                <Label
                  htmlFor={`rating-${rating}`}
                  className="flex items-center text-white"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      size={18}
                      key={i}
                      fill={i < rating ? "orange" : "lightgray"}
                      stroke={i < rating ? "orange" : "lightgray"}
                    />
                  ))}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </>
  );
}
