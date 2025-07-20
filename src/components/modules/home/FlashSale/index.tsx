import { Button } from "@/components/ui/button";
import NMContainer from "@/components/ui/core/NMContainer";
import ProductCard from "@/components/ui/core/ProductCard";
import { getFlashSaleProducts } from "@/services/FlashSale";

import Link from "next/link";
import { IProduct } from "@/types/product";
import CountDown from "./CountDown";

const FlashSale = async () => {
  const { data: products } = await getFlashSaleProducts();

  return (
    <div className="text-[#7c3f00] bg-opacity-50 pt-6 pb-8 bg-[#090807]">
      <NMContainer className="my-16">
        {/* Header section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <h2 className="text-2xl sm:text-3xl font-bold">Flash Sale</h2>
            <CountDown />
          </div>

          <Link href="/products">
            <Button
              variant="outline"
              className="rounded-full text-[#7c3f00] hover:text-[#facc15] bg-[#090807] border-[#7c3f00] font-bold hover:font-extrabold hover:bg-[#090807]"
            >
              All Collection
            </Button>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {products?.slice(0, 4)?.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </NMContainer>
    </div>
  );
};

export default FlashSale;
