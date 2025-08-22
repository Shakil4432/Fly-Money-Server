import CartProducts from "@/components/modules/cart/CartProducts";
import ProductBanner from "@/components/modules/products/banner";
import NMContainer from "@/components/ui/core/NMContainer";
import React from "react";

const CartPage = () => {
  return (
    <NMContainer>
      <div>
        <h1 className="p-10 text-center bg-gray-100 mt-4">Your Product Here</h1>
      </div>
      <div>
        <CartProducts></CartProducts>
      </div>
    </NMContainer>
  );
};

export default CartPage;
