export const dynamic = "force-dynamic";

import AboutSection from "@/components/modules/home/about";
import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/heroSection";
import NewArrivals from "@/components/modules/home/newArrivals";
import CustomerReviews from "@/components/modules/home/Review";

const HomePage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Category></Category>
      <FeaturedProducts></FeaturedProducts>
      <FlashSale></FlashSale>
      <NewArrivals></NewArrivals>
      <AboutSection></AboutSection>
      <CustomerReviews></CustomerReviews>
    </div>
  );
};

export default HomePage;
