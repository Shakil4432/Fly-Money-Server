export const dynamic = "force-dynamic";

// import CreateCategoryForm from "@/components/categoryDropdown/CreateCategoryForm";
// import { CategoryDropdown } from "@/components/categoryDropdown/CategoryDropdown";
import AboutSection from "@/components/modules/home/about";
import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/heroSection";
import AutoSlider from "@/components/modules/home/heroSection/AutoSlider";
import NewArrivals from "@/components/modules/home/newArrivals";
import CustomerReviews from "@/components/modules/home/Review";
// import CategorySidebarWithToggle from "@/components/modules/shop/category/Category2";
// import CategoryMenu from "@/components/modules/shop/category/Category2";
import { getAllCategories, getParentCategores } from "@/services/Category";
import { getFlashSaleProducts } from "@/services/FlashSale";
import { getAllProducts } from "@/services/products";

const HomePage = async () => {
  const { data } = await getAllCategories();
  const { data: ParentCategories } = await getParentCategores();
  const { data: products } = await getAllProducts();

  const { data: flashSale } = await getFlashSaleProducts();

  return (
    <div>
      {/* <CategoryDropdown></CategoryDropdown> */}
      {/* <CreateCategoryForm></CreateCategoryForm> */}

      {/* <HeroSection></HeroSection> */}
      <AutoSlider></AutoSlider>
      {/* <Category></Category> */}
      <FeaturedProducts
        products={products}
        ParentCategories={ParentCategories}
      ></FeaturedProducts>
      <FlashSale
        ParentCategories={ParentCategories}
        products={flashSale || []}
      ></FlashSale>
      <NewArrivals></NewArrivals>
      <AboutSection></AboutSection>
      <CustomerReviews></CustomerReviews>
    </div>
  );
};

export default HomePage;
