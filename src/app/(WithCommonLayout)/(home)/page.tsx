import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/heroSection";
import TopBrands from "@/components/modules/home/top-brand";

const HomePage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Category></Category>
      <FeaturedProducts></FeaturedProducts>
      <FlashSale></FlashSale>
    </div>
  );
};

export default HomePage;
