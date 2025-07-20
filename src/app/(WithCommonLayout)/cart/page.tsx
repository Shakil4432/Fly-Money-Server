import CartProducts from "@/components/modules/cart/CartProducts";
import ProductBanner from "@/components/modules/products/banner";
import NMContainer from "@/components/ui/core/NMContainer";
import React from "react";

const CartPage = () => {
  return (
    <NMContainer>
      <div>
        <ProductBanner title="Cart Page" path="Home - Cart"></ProductBanner>
      </div>
      <div>
        <CartProducts></CartProducts>
      </div>
    </NMContainer>
  );
};

export default CartPage;
