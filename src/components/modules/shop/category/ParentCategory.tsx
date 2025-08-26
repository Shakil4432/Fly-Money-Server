"use client";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/services/Category";

type Category = {
  _id: string;
  name: string;
  children?: Category[];
};

export default function ParentCategories({ color }: { color: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getAllCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <nav className={`${color} p-4 text-[#7c3f00] font-medium relative z-50`}>
      <div className="max-w-7xl mx-auto text-lg px-4 py-3 flex gap-6 relative z-50">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="relative z-50 group"
            onMouseEnter={() => setHovered(cat._id)}
            onMouseLeave={() => setHovered(null)}
          >
            <button className="hover:text-[#a0522d]">{cat.name}</button>
          </div>
        ))}
      </div>
    </nav>
  );
}
