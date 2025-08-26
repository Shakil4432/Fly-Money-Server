"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const AboutUsSection = () => {
  const features = [
    {
      title: "Genuine Leather",
      desc: "We source the finest full-grain leather for durability and luxury.",
      icon: "👜",
    },
    {
      title: "Handcrafted",
      desc: "Each item is handmade by skilled artisans with timeless techniques.",
      icon: "🛠️",
    },
    {
      title: "Sustainable Values",
      desc: "Our process respects the environment, from tanning to packaging.",
      icon: "🌿",
    },
  ];

  return (
    <section className="w-full py-24 bg-[#FFFFFF] border-t border-gray-200">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="space-y-10">
          <Badge className="bg-[#7c3f00] text-white text-2xl px-5 py-3 rounded-full shadow-md">
            About Us
          </Badge>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            The Art of Craftsmanship
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
            At Fly Money, we believe every piece tells a story. Our leather
            goods are hand-crafted with precision, tradition, and passion —
            using only full-grain, ethically sourced leather designed to last a
            lifetime.
          </p>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            {features.map((item) => (
              <Card
                key={item.title}
                className="border border-[#7c3f00]/20 rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6 space-y-4 flex flex-col items-start">
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Button */}
          <Button
            variant="outline"
            className="mt-8 text-[#7c3f00] border-[#7c3f00] hover:text-white hover:bg-[#7c3f00] transition-colors duration-300"
          >
            Explore Our Craft
          </Button>
        </div>

        {/* Side Image */}
        <div className="w-full h-full  bg-red-700 rounded-3xl">
          <div className="relative w-full  h-full rounded-3xl overflow-hidden  border border-[#2a2a2a]">
            <Image
              src="/about.png" // <- Add this image to your /public folder
              alt="About our craftsmanship"
              fill
              className="object-cover "
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
