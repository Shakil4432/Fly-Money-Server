import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/core/ProductCard";
import { getAllProducts } from "@/services/products";
import { IProduct } from "@/types/product";
import Link from "next/link";

const PRIMARY = "#7c3f00"; // Leather brown
const HOVER = "#facc15"; // Accent yellow
const BG_DARK = "#090807";

const FeaturedProducts = async () => {
  const { data: products } = await getAllProducts();

  return (
    <section className="py-16 bg-opacity-60 bg-[#090807] border-t border-[#1a1a1a]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#7c3f00]">
            Featured Products
          </h2>
          <Link href="/products">
            <Button
              variant="outline"
              className="rounded-full border border-[#7c3f00] text-[#7c3f00] hover:text-[#facc15] hover:border-[#facc15] transition font-bold"
            >
              View All
            </Button>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-12">
          {products?.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
