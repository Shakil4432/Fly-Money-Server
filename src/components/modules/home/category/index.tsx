"use client";

import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import NMContainer from "@/components/ui/core/NMContainer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import SubCategoryDropdown from "./SubCategoryDropdown";

const demoCategories = [
  {
    name: "NEW IN",
    icon: "https://cdn-icons-png.flaticon.com/128/891/891448.png",
    subcategories: ["Leather Wallets", "Belts", "Key Holders"],
  },
  {
    name: "MEN",
    icon: "https://cdn-icons-png.flaticon.com/128/4140/4140048.png",
    subcategories: ["Briefcases", "Wallets", "Messenger Bags"],
  },
  {
    name: "WOMEN",
    icon: "https://cdn-icons-png.flaticon.com/128/3220/3220315.png",
    subcategories: ["Handbags", "Purses", "Tote Bags"],
  },
  {
    name: "KIDS",
    icon: "https://cdn-icons-png.flaticon.com/128/9136/9136536.png",
    subcategories: ["Mini Bags", "Pouches", "Backpacks"],
  },
  {
    name: "KIDSs",
    icon: "https://cdn-icons-png.flaticon.com/128/9136/9136536.png",
    subcategories: ["Mini Bags", "Pouches", "Backpacks"],
  },
];

const PRIMARY = "#7c3f00";
const SECONDARY = "#facc15";

const Category = () => {
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start" });
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number }>(
    { top: 0, left: 0 }
  );
  const [activeSubCategories, setActiveSubCategories] = useState<string[]>([]);

  const handleCardClick = (
    categoryName: string,
    event: React.MouseEvent<HTMLButtonElement>,
    subCategories: string[]
  ) => {
    if (openCategory === categoryName) {
      setOpenCategory(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 8, left: rect.left });
      setOpenCategory(categoryName);
      setActiveSubCategories(subCategories);
    }
  };

  return (
    <section className="relative overflow-hidden py-20 bg-[#121212]">
      {/* Gradient Lighting Effects */}
      {/* <div className="absolute w-[400px] h-[400px] top-[-100px] left-[-100px] rounded-full bg-[#009688] blur-3xl opacity-30 pointer-events-none z-0"></div>
      <div className="absolute w-[300px] h-[300px] bottom-[-100px] right-[100px] rounded-full bg-[#7c3f00] blur-2xl opacity-40 pointer-events-none z-0"></div>
      <div className="absolute w-[200px] h-[200px] top-[30%] right-[30%] rounded-full bg-yellow-700 blur-2xl opacity-20 pointer-events-none z-0"></div> */}

      <NMContainer className="relative z-10">
        <div className="flex flex-col md:flex-row mb-10 items-start md:items-center justify-between gap-4">
          <h2
            className="font-extrabold text-2xl md:text-3xl"
            style={{ color: PRIMARY }}
          >
            Categories
          </h2>
          <Link href="/products" passHref>
            <Button
              variant="outline"
              className="rounded-full border border-[#7c3f00] text-[#7c3f00] font-bold hover:font-extrabold hover:bg-[#090807] bg-[#090807] hover:text-[#facc15]"
            >
              All Collection
            </Button>
          </Link>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {demoCategories.map((category) => (
              <div
                key={category.name}
                className="relative min-w-[287px] flex-shrink-0"
              >
                <button
                  onClick={(e) =>
                    handleCardClick(category.name, e, category.subcategories)
                  }
                  className="w-full focus:outline-none"
                  aria-expanded={openCategory === category.name}
                >
                  <Card
                    className="h-44 md:h-48 flex flex-col items-center justify-center rounded-2xl border transition duration-300 ease-in-out"
                    style={{
                      borderColor: PRIMARY,
                      backgroundColor: "#090807",
                      color: PRIMARY,
                    }}
                  >
                    <CardContent className="flex flex-col items-center justify-center space-y-3 p-4">
                      <Image
                        src={category.icon}
                        alt={category.name}
                        width={60}
                        height={60}
                        className="object-contain w-16 h-16 sm:w-20 sm:h-20"
                      />
                      <div
                        className="text-center text-sm sm:text-base font-semibold"
                        style={{ color: PRIMARY }}
                      >
                        {category.name}
                      </div>
                    </CardContent>
                  </Card>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Subcategory Dropdown rendered in Portal */}
        {openCategory && (
          <SubCategoryDropdown
            position={dropdownPos}
            items={activeSubCategories}
            onClose={() => setOpenCategory(null)}
            primaryColor={PRIMARY}
            secondaryColor={SECONDARY}
          />
        )}
      </NMContainer>
    </section>
  );
};

export default Category;
