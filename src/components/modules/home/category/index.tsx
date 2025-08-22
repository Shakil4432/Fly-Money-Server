"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import NMContainer from "@/components/ui/core/NMContainer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { getAllCategories, getParentCategores } from "@/services/Category";
import { useRouter, useSearchParams } from "next/navigation";

const PRIMARY = "#7c3f00";
const SECONDARY = "#facc15";

const Category = () => {
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start" });
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const router = useRouter();

  const [Parent, setParent] = useState([]);

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams();
    params.set(query, value.toString());
    router.push(`/products?${params.toString()}`);
  };

  useEffect(() => {
    const parentCategories = async () => {
      const data = await getParentCategores();
      setParent(data.data);
    };
    parentCategories();
  }, []);

  return (
    <section className="relative overflow-hidden   flex items-center justify-center  ">
      {/* Gradient Lighting Effects */}
      {/* <div className="absolute w-[400px] h-[400px] top-[-100px] left-[-100px] rounded-full bg-[#009688] blur-3xl opacity-30 pointer-events-none z-0"></div>
      <div className="absolute w-[300px] h-[300px] bottom-[-100px] right-[100px] rounded-full bg-[#7c3f00] blur-2xl opacity-40 pointer-events-none z-0"></div>
      <div className="absolute w-[200px] h-[200px] top-[30%] right-[30%] rounded-full bg-yellow-700 blur-2xl opacity-20 pointer-events-none z-0"></div> */}

      <NMContainer className="relative z-10 my-16">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3">
            {Parent.map((category: any) => (
              <div
                key={category.name}
                className="relative min-w-[250px] flex-shrink-0"
              >
                <button
                  onClick={(e) =>
                    handleSearchQuery("parentCategory", category._id)
                  }
                  className="w-full focus:outline-none"
                  aria-expanded={openCategory === category.name}
                >
                  <Card className="h-44 md:h-48 flex flex-col bg-[#FFFFFF] items-center rounded-none  justify-center  border transition duration-300 ease-in-out">
                    <CardContent className="flex flex-col items-center justify-center space-y-3 p-4 ">
                      <Image
                        src={category.icon}
                        alt={category.name}
                        width={60}
                        height={60}
                        className="object-contain w-16 h-16 sm:w-20 sm:h-20"
                      />
                      <div
                        className="text-center text-lg sm:text-base font-semibold"
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
      </NMContainer>
    </section>
  );
};

export default Category;
