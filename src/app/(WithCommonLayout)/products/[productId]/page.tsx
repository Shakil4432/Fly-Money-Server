import ProductBanner from "@/components/modules/products/banner";
import ProductDetails from "@/components/modules/products/productDetails";
import NMContainer from "@/components/ui/core/NMContainer";
import { getSingleProduct } from "@/services/products";
import React from "react";

const ProdcutDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const { data: product } = await getSingleProduct(productId);
  console.log(product);
  return (
    <NMContainer className="text-white">
      <ProductBanner
        title="Product Details"
        path="Home - Products - Product Details"
      ></ProductBanner>
      <ProductDetails product={product}></ProductDetails>
    </NMContainer>
  );
};

export default ProdcutDetailsPage;
