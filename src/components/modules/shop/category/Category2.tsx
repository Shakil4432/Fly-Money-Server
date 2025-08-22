"use client";
import { useEffect, useState } from "react";
import { Menu, X, Plus, Minus, ChevronDown } from "lucide-react";
import { getAllCategories } from "@/services/Category";
import Logo from "@/assets/svgs/Logo";
import Category3 from "./Category3";
import { useRouter } from "next/navigation";

type Category = {
  _id: string;
  name: string;
  children?: Category[];
};

const CategoryItem = ({
  category,
  level,
}: {
  category: Category;
  level: "parentCategory" | "subCategory" | "thirdSubCategory";
}) => {
  const [open, setOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const router = useRouter();

  const handleCategoryFilter = (key: string, id: string) => {
    const params = new URLSearchParams();
    params.set(key, id); // only ONE level is set
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const nextLevel =
    level === "parentCategory"
      ? "subCategory"
      : level === "subCategory"
      ? "thirdSubCategory"
      : "thirdSubCategory";

  return (
    <div className="mb-2">
      {/* Category row (clickable for API call) */}
      <div
        className="flex justify-between items-center cursor-pointer font-medium hover:text-[#7c3f00]"
        onClick={() => handleCategoryFilter(level, category._id)}
      >
        <span>{category.name}</span>

        {hasChildren && (
          <div
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering API when expanding
              setOpen(!open);
            }}
          >
            {open ? <Minus size={16} /> : <Plus size={16} />}
          </div>
        )}
      </div>

      {/* Children */}
      {open && hasChildren && (
        <div className="ml-4 mt-1 text-sm text-[#7c3f00]/70">
          {category.children?.map((child) => (
            <CategoryItem key={child._id} category={child} level={nextLevel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function CategorySidebarWithToggle() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories2, setCategories2] = useState<Category[]>([]);

  useEffect(() => {
    const categoryData = async () => {
      const { data } = await getAllCategories();
      setCategories2(data);
    };
    categoryData();
  }, []);

  return (
    <div>
      <div className="relative z-50 bg-[#f9f5f0]">
        {/* Hamburger Icon (Always Visible) */}
        <div className="px-2 flex items-center justify-start">
          <button onClick={() => setSidebarOpen(true)} className="w-[22%]">
            <div className="p-2 flex items-center justify-start gap-4 w-full rounded-md hover:bg-[#7c3f00]/20 transition duration-300">
              <div className="p-2 text-[#7c3f00] shadow rounded-md mx-4">
                <Menu size={16} />
              </div>
              <div className="flex items-center justify-start gap-16">
                <h1 className="text-sm text-[#7c3f00]">SHOP BY CATEGORY</h1>
                <ChevronDown className="text-[#7c3f00]" />
              </div>
            </div>
          </button>
          <Category3 color="bg-[#f9f5f0]" />
        </div>

        {/* Sidebar Menu */}
        <div
          className={`fixed top-0 left-0 w-72 h-screen bg-[#f9f5f0] text-[#7c3f00] shadow-lg z-40 p-4 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Logo />
            <X
              className="cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            />
          </div>

          <h2 className="text-lg font-semibold mb-3">Shop By Categories</h2>

          <div className="overflow-y-auto max-h-[70vh] pr-2">
            {categories2.map((cat) => (
              <CategoryItem
                key={cat._id}
                category={cat}
                level="parentCategory"
              />
            ))}
          </div>

          <button className="mt-6 w-full bg-[#7c3f00] text-white py-2 rounded">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
