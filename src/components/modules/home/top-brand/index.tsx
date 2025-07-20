import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import NMContainer from "@/components/ui/core/NMContainer";
import { getAllBrands } from "@/services/brand";
import { getAllCategories } from "@/services/Category";
import { IBrand } from "@/types/brand";
import { ICategory } from "@/types/category";

import Image from "next/image";
import Link from "next/link";

const TopBrands = async () => {
  const { data: categories } = await getAllCategories();

  return (
    <NMContainer className="my-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-[#7c3f00]">Categories</h2>
        <Link href="/products">
          <Button
            variant="outline"
            className="rounded-full text-[#7c3f00] hover:text-[#facc15] font-bold bg-[#090807] hover:bg-[#090807] border-[#7c3f00]"
          >
            All Collection
          </Button>
        </Link>
      </div>

      {/* Carousel */}
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className="-ml-4">
          {categories.slice(0, 12).map((category: ICategory, index: number) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <Card className="bg-[#0a0f1e] border border-[#7c3f00]/40 hover:border-[#7c3f00] transition rounded-xl">
                <CardContent className="flex items-center justify-center h-40 p-4">
                  <Image
                    src={category?.icon}
                    alt={category?.name || "Category Logo"}
                    width={100}
                    height={100}
                    className="object-contain h-full w-full"
                  />
                </CardContent>
                <CardContent className="flex items-center justify-center h-40 p-4 text-gray-400">
                  {category?.name}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </NMContainer>
  );
};

export default TopBrands;
