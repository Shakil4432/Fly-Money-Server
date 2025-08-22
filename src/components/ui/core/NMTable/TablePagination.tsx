"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TablePagination = ({ totalPage }: { totalPage: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ✅ Always read page from URL instead of local state
  const currentPage = Number(searchParams.get("page")) || 1;

  // ✅ Preserve existing query params while updating "page"
  const createQueryString = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return params.toString();
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      router.push(`${pathname}?${createQueryString(currentPage - 1)}`, {
        scroll: false,
      });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      router.push(`${pathname}?${createQueryString(currentPage + 1)}`, {
        scroll: false,
      });
    }
  };

  return (
    <div className="flex items-center gap-2 my-5 text-gray-400">
      <Button
        onClick={handlePrev}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#7c3f00] hover:text-gray-400"
      >
        <ArrowLeft />
      </Button>

      {Array.from({ length: totalPage }).map((_, index) => {
        const page = index + 1;
        return (
          <Button
            key={page}
            onClick={() =>
              router.push(`${pathname}?${createQueryString(page)}`, {
                scroll: false,
              })
            }
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPage === page
                ? "bg-[#7c3f00] hover:bg-[#7c3f00] hover:text-gray-400"
                : "hover:text-gray-400"
            }`}
          >
            {page}
          </Button>
        );
      })}

      <Button
        onClick={handleNext}
        disabled={currentPage === totalPage}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#7c3f00] hover:text-gray-400"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default TablePagination;
