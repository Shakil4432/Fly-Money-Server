import UpdateProductForm from "@/components/modules/shop/products/UpdateProductForm";
import { getSingleProduct } from "@/services/products";

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const { data: product } = await getSingleProduct(productId);

  return (
    <div className="flex justify-center items-center">
      <UpdateProductForm product={product}></UpdateProductForm>
    </div>
  );
};

export default UpdateProductPage;
