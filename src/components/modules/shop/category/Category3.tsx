"use client";

import { useEffect, useState } from "react";
import { getAllCategories } from "@/services/Category";
import { ChevronRight, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

type Category = {
  _id: string;
  name: string;
  children?: Category[];
};

export default function Category3({ color }: { color: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const [subHovered, setSubHovered] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getAllCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams();
    params.set(query, value.toString());
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <nav className={`${color} text-[#7c3f00] z-[500] font-medium`}>
      {/* Desktop (hover mega menu) */}
      <div className="flex gap-6 z-[500]">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="relative group"
            onMouseEnter={() => setHovered(cat._id)}
            onMouseLeave={() => setHovered(null)}
          >
            <button
              onClick={() => handleSearchQuery("parentCategory", cat._id)}
              className="hover:text-[#a0522d] pr-3 truncate"
            >
              {cat.name}
            </button>

            {hovered === cat._id && cat.children && (
              <div className="hidden lg:absolute left-0 top-full pt-2 bg-white shadow-md border min-w-[220px] z-50 p-3">
                {cat.children.map((child) => (
                  <div
                    key={child._id}
                    className="relative group"
                    onMouseEnter={() => setSubHovered(child._id)}
                    onMouseLeave={() => setSubHovered(null)}
                  >
                    <div
                      onClick={() =>
                        handleSearchQuery("subCategory", child._id)
                      }
                      className="flex justify-between items-center hover:text-[#7c3f00] cursor-pointer pr-6 px-2 py-1"
                    >
                      {child.name}
                      {child.children && <ChevronRight size={14} />}
                    </div>

                    {/* third level */}
                    {child.children && subHovered === child._id && (
                      <div className="hidden lg:absolute left-full top-0 bg-white shadow-md border min-w-[200px] z-[200] p-3">
                        {child.children.map((gchild) => (
                          <button
                            key={gchild._id}
                            onClick={() =>
                              handleSearchQuery("thirdSubCategory", gchild._id)
                            }
                            className="block px-2 py-1 text-sm hover:text-[#7c3f00]"
                          >
                            {gchild.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
