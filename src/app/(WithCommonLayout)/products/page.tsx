import AllProducts from "@/components/modules/products";
import ProductBanner from "@/components/modules/products/banner";

import NMContainer from "@/components/ui/core/NMContainer";
import {
  getAllProducts,
  getAllProductsWithoutPagination,
} from "@/services/products";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { page, ...query } = await searchParams;
  const { data: products, meta } = await getAllProducts(page, "12", query);
  const { data } = await getAllProductsWithoutPagination();
  const length = data.length;
  const { totalPage } = meta;

  return (
    <NMContainer className="text-white">
      {/* <ProductBanner
        title="All Products"
        path="Home - Products"
      ></ProductBanner> */}

      <AllProducts
        products={products}
        totalPage={totalPage}
        length={length}
      ></AllProducts>
    </NMContainer>
  );
};

export default AllProductsPage;
