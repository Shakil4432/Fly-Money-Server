"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import NMContainer from "@/components/ui/core/NMContainer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (name: string) => {
    setOpenCategory((prev) => (prev === name ? null : name));
  };

  return (
    <NMContainer className="mt-20 md:mt-28 lg:mt-36">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {demoCategories.map((category) => {
          const isOpen = openCategory === category.name;

          return (
            <div key={category.name} className="relative">
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={`${category.name}-menu`}
              >
                <Card
                  className={`h-44 md:h-48 flex flex-col items-center justify-center rounded-2xl border transition duration-300 ease-in-out
                    ${
                      isOpen
                        ? `border-[${PRIMARY}] bg-[#090807]`
                        : `border-[${PRIMARY}] bg-[#090807] hover:border-[${PRIMARY}]`
                    }
                    `}
                  style={{
                    borderColor: isOpen ? PRIMARY : PRIMARY,
                    backgroundColor: isOpen ? "#090807" : "#090807",
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

              {/* Dropdown menu */}
              <div
                id={`${category.name}-menu`}
                className={`absolute  -top-32 right- z-30 mt-2 w-48 rounded-lg shadow-lg origin-top scale-y-0 transform transition-transform duration-200 ease-out`}
                style={{
                  transformOrigin: "top",
                  border: `1px solid ${PRIMARY}`,
                  backgroundColor: "#090807",
                  color: PRIMARY,
                  boxShadow: `0 4px 10px ${PRIMARY}50`,
                  ...(isOpen
                    ? { transform: "scaleY(1)" }
                    : { transform: "scaleY(0)" }),
                }}
              >
                <ul
                  className="divide-y"
                  style={{ borderColor: `${PRIMARY}30` }}
                >
                  {category.subcategories.map((sub) => (
                    <li
                      key={sub}
                      className="px-5 py-3 cursor-pointer text-sm font-semibold transition-colors duration-200"
                      style={{ borderBottom: `1px solid ${PRIMARY}30` }}
                      tabIndex={0}
                      role="menuitem"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = PRIMARY;
                        e.currentTarget.style.color = SECONDARY;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = PRIMARY;
                      }}
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </NMContainer>
  );
};

export default Category;
