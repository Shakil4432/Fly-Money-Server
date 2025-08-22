// import ManageProducts from "@/components/modules/shop/product";
// import { getAllProducts } from "@/services/Product";

import ManageProducts from "@/components/modules/shop/products";
import { getAllProducts } from "@/services/products";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const ManageProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { page, ...query } = await searchParams;
  console.log(query);

  const { data, meta } = await getAllProducts(page, "10", query);

  return (
    <div>
      <ManageProducts products={data} meta={meta} />
    </div>
  );
};

export default ManageProductsPage;
