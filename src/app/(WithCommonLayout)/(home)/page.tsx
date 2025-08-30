export const dynamic = "force-dynamic";

import AboutSection from "@/components/modules/home/about";

import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FlashSale from "@/components/modules/home/FlashSale";

import AutoSlider from "@/components/modules/home/heroSection/AutoSlider";
import NewArrivalSlider from "@/components/modules/home/newArrivals";
import ReviewSlider from "@/components/modules/home/Review";

import TopRatedProducts from "@/components/modules/home/TopRatedProducts";
import TrendingProducts from "@/components/modules/home/TrendingProducts";

import { getParentCategores } from "@/services/Category";
import { getFlashSaleProducts } from "@/services/FlashSale";
import {
  getAllProducts,
  getNewArrivalProducts,
  getTopRatedProduct,
  getTrendingProducts,
} from "@/services/products";
import { getAllReviews } from "@/services/review";

const HomePage = async () => {
  const { data: ParentCategories } = await getParentCategores();
  const { data: products } = await getAllProducts();
  const { data: trendingProduct } = await getTrendingProducts();

  const { data: flashSale } = await getFlashSaleProducts();
  const { data: newArrivals } = await getNewArrivalProducts();
  const { data: TopRatingProducts } = await getTopRatedProduct();
  const { data: reviews } = await getAllReviews();
  console.log(reviews);

  return (
    <div>
      <AutoSlider></AutoSlider>
      <FeaturedProducts
        products={products}
        ParentCategories={ParentCategories}
      ></FeaturedProducts>
      <FlashSale
        ParentCategories={ParentCategories}
        products={flashSale || []}
      ></FlashSale>
      <TrendingProducts trendingProduct={trendingProduct}></TrendingProducts>
      <TopRatedProducts
        TopRatingProducts={TopRatingProducts}
      ></TopRatedProducts>
      <NewArrivalSlider newArrivals={newArrivals}></NewArrivalSlider>
      <AboutSection></AboutSection>
      <ReviewSlider reviews={reviews?.result || []}></ReviewSlider>
    </div>
  );
};

export default HomePage;
