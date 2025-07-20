import AllProducts from "@/components/modules/products";
import ProductBanner from "@/components/modules/products/banner";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllProducts } from "@/services/products";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const { data: products } = await getAllProducts(undefined, undefined, query);

  return (
    <NMContainer className="text-white">
      <ProductBanner
        title="All Products"
        path="Home - Products"
      ></ProductBanner>
      <AllProducts products={products}></AllProducts>
    </NMContainer>
  );
};

export default AllProductsPage;
