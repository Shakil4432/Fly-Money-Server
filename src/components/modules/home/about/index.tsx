"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const AboutUsSection = () => {
  return (
    <section className="w-full py-20   border-t ">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="space-y-10">
          <Badge className="bg-[#7c3f00] text-white text-2xl px-5 py-3 rounded-full">
            About Us
          </Badge>

          <h2 className="text-4xl md:text-5xl font-extrabold ">
            The Art of Craftsmanship
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
            At Fly Money, we believe every piece tells a story. Our leather
            goods are hand-crafted with precision, tradition, and passion —
            using only full-grain, ethically sourced leather designed to last a
            lifetime.
          </p>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[
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
            ].map((item) => (
              <Card
                key={item.title}
                className=" border border-[#7c3f00]/10 rounded-xl text-left"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="text-2xl">{item.icon}</div>
                  <h3 className="text-lg font-semibold ">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Button */}
          <Button
            variant="outline"
            className="mt-8 text-[#7c3f00]  border-[#7c3f00] hover:text-white hover:bg-[#7c3f00]"
          >
            Explore Our Craft
          </Button>
        </div>

        {/* Side Image */}
        <div className="w-full h-full flex justify-center items-center">
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-[#2a2a2a]">
            <Image
              src="/about.png" // <- Add this image to your /public folder
              alt="About our craftsmanship"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
