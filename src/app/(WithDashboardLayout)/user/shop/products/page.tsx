// import ManageProducts from "@/components/modules/shop/product";
// import { getAllProducts } from "@/services/Product";

import ManageProducts from "@/components/modules/shop/products";
import { getAllProducts } from "@/services/products";

const ManageProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, meta } = await getAllProducts(page, "3");
  return (
    <div>
      <ManageProducts products={data} meta={meta} />
    </div>
  );
};

export default ManageProductsPage;
