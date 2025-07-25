"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import styles from "./HeroSeciton.module.css";

const HeroSection = () => {
  return (
    <section
      className={`${styles.banner} relative overflow-hidden min-h-[80vh] bg-[#121212] text-white flex items-center px-6 md:px-12 py-12 border border-b-slate-900`}
    >
      {/* Gradient Lighting Effects */}
      <div className="absolute w-[400px] h-[400px] top-[-100px] left-[-100px] rounded-full bg-gray-300 blur-3xl opacity-30 pointer-events-none z-0"></div>
      <div className="absolute w-[300px] h-[300px] bottom-[-100px] right-[100px] rounded-full bg-[#7c3f00] blur-2xl opacity-40 pointer-events-none z-0"></div>
      <div className="absolute w-[200px] h-[200px] top-[30%] right-[30%] rounded-full bg-yellow-700 blur-2xl opacity-20 pointer-events-none z-0"></div>

      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10 relative">
        {/* Image first on mobile, second on desktop */}
        <div className="order-1 md:order-2 flex justify-center">
          <Image
            src="/leather.png"
            alt="Leather Goods Hero"
            width={700}
            height={700}
            className="rounded-xl object-cover shadow-2xl w-full max-w-md"
            priority
          />
        </div>

        {/* Text second on mobile, first on desktop */}
        <div className="order-2 md:order-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Premium <span className="text-[#864025]">Leather Goods</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Discover timeless craftsmanship. Shop handcrafted wallets, belts,
            and bags made from full-grain leather.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
            <Button className="bg-[#7c3f00] hover:bg-[#5e2f00] text-white px-6 py-3 rounded-lg text-base font-medium shadow-lg transition">
              Shop Now
            </Button>
            <Button
              className="border border-[#7c3f00] text-white bg-[#121212] hover:bg-[#7c3f00] hover:text-white px-6 py-3 rounded-lg transition"
              variant="outline"
            >
              View Collection
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
