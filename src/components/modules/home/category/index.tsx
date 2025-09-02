"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import NMContainer from "@/components/ui/core/NMContainer";

import Image from "next/image";

import { getParentCategores } from "@/services/Category";
import { useRouter } from "next/navigation";

const PRIMARY = "#7c3f00";

const Category = () => {
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start" });

  const [openCategory] = useState<string | null>(null);

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
      <NMContainer className="relative z-10 my-8 lg:my-16">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3">
            {Parent.map((category: any) => (
              <div
                key={category.name}
                className="relative min-w-[100px] lg:min-w-[250px] flex-shrink-0"
              >
                <button
                  onClick={() =>
                    handleSearchQuery("parentCategory", category._id)
                  }
                  className="w-full focus:outline-none"
                  aria-expanded={openCategory === category.name}
                >
                  <Card className="h-24 md:h-48 flex flex-col bg-[#FFFFFF] items-center rounded-none hover:shadow-2xl  justify-center  border transition duration-300 ease-in-out">
                    <CardContent className="flex flex-col items-center justify-center space-y-3 p-4 ">
                      <Image
                        src={category.icon}
                        alt={category.name}
                        width={60}
                        height={60}
                        className="object-contain w-6 h-6 lg:w-16 lg:h-16 "
                      />
                      <div
                        className="text-center text-xs lg:text-lg  font-semibold "
                        style={{ color: PRIMARY }}
                      >
                        <span className="truncate">{category.name}</span>
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
