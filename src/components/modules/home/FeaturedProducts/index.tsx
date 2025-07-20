import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/core/ProductCard";
import { getAllProducts } from "@/services/products";
import { IProduct } from "@/types/product";
import Link from "next/link";

const FeaturedProducts = async () => {
  const { data: products } = await getAllProducts();

  return (
    <div className="bg-opacity-50 mt-28 py-10 bg-[#090807]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h2 className="font-bold text-2xl md:text-3xl text-[#7c3f00]">
            Featured Products
          </h2>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">
          {products?.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
