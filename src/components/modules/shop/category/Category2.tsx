"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Menu, X, Plus, Minus, ChevronDown } from "lucide-react";
import { getAllCategories } from "@/services/Category";
import Logo from "@/assets/svgs/Logo";
import { usePathname, useRouter } from "next/navigation";
import Category3 from "./Category3";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/components/constant";

type Category = {
  _id: string;
  name: string;
  children?: Category[];
};

export const CategoryItem = ({
  category,
  level,
  setSidebarOpen,
}: {
  category: Category;
  level: "parentCategory" | "subCategory" | "thirdSubCategory";
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const router = useRouter();

  const handleCategoryFilter = (key: string, id: string) => {
    const params = new URLSearchParams();
    params.set(key, id);

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
      <div
        className="flex justify-between items-center cursor-pointer font-medium hover:text-[#7c3f00]"
        onClick={() => handleCategoryFilter(level, category._id)}
      >
        <span>{category.name}</span>
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="p-1"
          >
            {open ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        )}
      </div>

      {open && hasChildren && (
        <div className="ml-4 mt-1 text-sm text-[#7c3f00]/70">
          {category.children?.map((child) => (
            <CategoryItem
              key={child._id}
              category={child}
              level={nextLevel}
              setSidebarOpen={setSidebarOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function CategorySidebarWithToggle() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories2, setCategories2] = useState<Category[]>([]);
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const categoryData = async () => {
      const { data } = await getAllCategories();
      setCategories2(data);
    };
    categoryData();
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <div className="relative z-50 bg-[#f9f5f0]">
      {/* SHOP BY CATEGORY Button (visible on all devices) */}
      <div className="flex items-center px-2">
        <button
          onClick={() => setSidebarOpen(true)}
          className="hidden lg:flex items-center gap-3 p-2 w-full md:w-[260px] rounded-md hover:bg-[#7c3f00]/20 transition"
        >
          <div className="p-2 text-[#7c3f00] shadow rounded-md">
            <Menu size={18} />
          </div>
          <h1 className="text-sm text-[#7c3f00] font-semibold">
            SHOP BY CATEGORY
          </h1>
          <ChevronDown className="text-[#7c3f00] ml-auto" />
        </button>

        {/* Desktop-only horizontal nav next to it */}
        <div className="flex flex-1 py-3 lg:ml-10 overflow-x-auto  lg:overflow-x-visible  relative z-[200] w-full md:w-auto">
          <Category3 color="bg-[#f9f5f0]" />
        </div>
      </div>

      {/* Sidebar Drawer (same for desktop + mobile) */}
      <div
        className={`fixed top-0 left-0 w-72 h-screen bg-[#f9f5f0] text-[#7c3f00] shadow-lg z-50 p-4 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Logo />
          <X className="cursor-pointer" onClick={() => setSidebarOpen(false)} />
        </div>

        <h2 className="text-lg font-semibold mb-3">Shop By Categories</h2>

        <div className="overflow-y-auto max-h-[70vh] pr-2">
          {categories2.map((cat) => (
            <CategoryItem
              key={cat._id}
              category={cat}
              level="parentCategory"
              setSidebarOpen={setSidebarOpen}
            />
          ))}
        </div>

        {user ? (
          <Button
            onClick={handleLogout}
            className="mt-6 w-full bg-[#7c3f00] text-white py-2 rounded hover:bg-[#7c3f00]"
          >
            Logout
          </Button>
        ) : (
          <Button className="mt-6 w-full bg-[#7c3f00] text-white py-2 rounded hover:bg-[#7c3f00]">
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
