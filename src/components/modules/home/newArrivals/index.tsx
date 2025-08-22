"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const newProducts = [
  {
    name: "Classic Leather Wallet",
    image: "/leather.png",
    price: "$89",
  },
  {
    name: "Vintage Leather Belt",
    image: "/leather.png",
    price: "$59",
  },
  {
    name: "Executive Briefcase",
    image: "/leather.png",
    price: "$199",
  },
  {
    name: "Executive Briefcase2",
    image: "/leather.png",
    price: "$199",
  },
];

const NewArrivals = () => {
  return (
    <section className="py-20 text-white border-b">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#7c3f00]">
          New Arrivals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-center justify-between">
          {newProducts.map((product) => (
            <Card
              key={product.name}
              className=" max-w-96 border border-[#7c3f00]/10  "
            >
              <CardContent className="p-4 space-y-4 ">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-[#facc15] font-medium">{product.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
