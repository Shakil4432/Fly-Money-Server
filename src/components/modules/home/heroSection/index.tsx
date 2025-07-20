import { Button } from "@/components/ui/button";
import styles from "./HeroSeciton.module.css";
import Image from "next/image";
import cupImage from "@/assets/cup-with-headphone.png";

const HeroSection = () => {
  return (
    <div
      className={`${styles.banner} min-h-[60vh] md:h-[80vh] flex items-center justify-center px-4`}
    >
      <div className="flex justify-center w-full">
        <div className="space-y-6 max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#7c3f00] font-bold leading-snug sm:leading-normal">
            Don&apos;t Miss Out on These Unbeatable
            <span className="text-[#facc15]"> Black Friday</span> Deals!
          </h1>

          <p className="text-[#fef9c3] text-sm sm:text-base md:text-lg">
            Save big this Black Friday with unbeatable deals on tech, home
            essentials, fashion, and more! Limited stock.
          </p>

          <div className="flex items-center justify-center flex-wrap gap-4 pt-4">
            <Button className="rounded-full text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-[#7c3f00] text-white hover:bg-[#92400e] transition">
              Buy Now
            </Button>
            <Button
              className="rounded-full text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border border-[#7c3f00] text-[#facc15] bg-black hover:bg-[#facc15] hover:text-white transition"
              variant="outline"
            >
              All Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
