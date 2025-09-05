"use client";

import { NMTable } from "@/components/ui/core/NMTable/index";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Search, Star, Trash } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";
import { IMeta } from "@/types/meta";
import DiscountModal from "./DiscountModal";
import DeleteConfirmationModal from "@/components/ui/core/NMModal/DeleteConfirmModal";
import { deleteProduct } from "@/services/products";
import { toast } from "sonner";
import ProductFilterDrawer from "./ProductFilterDrawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const ManageProducts = ({
  products,
  meta,
}: {
  products: IProduct[];
  meta: IMeta;
}) => {
  const { totalPage } = meta;
  const [selectedIds, setSelectedIds] = useState<string[] | []>([]);
  const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [sort, setSort] = useState<string>("All");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilters] = useState<{
    [key: string]: string | number | number[];
  }>({});

  const handleDelete = (data: IProduct) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleView = (product: IProduct) => {
    router.push(`/products/${product._id}`);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteProduct(selectedId);

        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const handleSearch = () => {
    setSearch((prev) => ({ ...prev, search: searchTerm }));
    // Optionally reload page or call API here if you want instant search
    router.push(`?searchTerm=${searchTerm}`);
  };

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const handleSearchQuery = (key: string, value: string | number | boolean) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams: Record<string, string> = {
      ...currentParams,
      [key]: value.toString(),
    };
    Object.keys(updatedParams).forEach((k) => {
      if (updatedParams[k] === "" || updatedParams[k] === "All")
        delete updatedParams[k];
    });
    const queryString = new URLSearchParams(updatedParams).toString();
    router.push(`${pathName}?${queryString}`, { scroll: false });
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="border-[#7c3f00] !text-[#7c3f00]"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="border-[#7c3f00] !text-[#7c3f00]"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              setSelectedIds((prevIds) => [...prevIds, row.original._id]);
            } else {
              setSelectedIds((prevIds) =>
                prevIds.filter((id) => id !== row.original._id)
              );
            }
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.imageUrls[0]}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original?.parentCategory?.name}</span>,
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => <span>{row.original.brand}</span>,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <span>{row.original.stock}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>$ {row.original.price.toFixed(2)}</span>,
    },
    {
      accessorKey: "offerPrice",
      header: "Offer Price",
      cell: ({ row }) => (
        <span>
          $ {row.original.offerPrice ? row.original.offerPrice.toFixed(2) : "0"}
        </span>
      ),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const rating = row.original?.averageRating;

        if (rating === null || rating === undefined) {
          return <span>N/A</span>;
        }

        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        return (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => {
              if (index < fullStars) {
                return (
                  <Star
                    key={index}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                );
              }
              if (index === fullStars && hasHalfStar) {
                return (
                  <Star
                    key={index}
                    size={16}
                    className="fill-yellow-400/50 text-yellow-400"
                  />
                );
              }
              return <Star key={index} size={16} className="text-gray-300" />;
            })}
            <span className="text-sm text-gray-500">
              ({row.original.ratingCount})
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-blue-500"
            title="View"
            onClick={() => handleView(row.original)}
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(
                `/admin/shop/products/update-product/${row.original._id}`
              )
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete"
            onClick={() => handleDelete(row.original)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <h1 className="text-lg text-center  lg:text-xl font-bold text-[#7c3f00]">
        Manage Products
      </h1>
      <div className="flex items-center justify-between p-3">
        <div className="grid grid-cols-2 lg:grid-cols-5 items-center gap-2">
          <div className="flex items-center border rounded-md px-2 w-full">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none focus:ring-0 focus-visible:ring-0 focus:outline-none bg-white"
            />

            <Button size="icon" variant="ghost" onClick={handleSearch}>
              <Search className="w-5 h-5 text-[#7c3f00]" />
            </Button>
          </div>
          {/* ✅ Sort Dropdown */}
          <div className=" !bg-white">
            <Select
              value={sort}
              onValueChange={(val) => {
                setSort(val);
                handleSearchQuery("sort", val);
              }}
            >
              <SelectTrigger className="bg-white">
                <SelectValue className="bg-white" placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="All">Sort By</SelectItem>
                <SelectItem value="-createdAt">Newest First</SelectItem>
                <SelectItem value="createdAt">Oldest First</SelectItem>
                <SelectItem value="price">Price Low → High</SelectItem>
                <SelectItem value="-price">Price High → Low</SelectItem>
                <SelectItem value="-averageRating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Drawer */}
          <ProductFilterDrawer
            onApply={(f) => setFilters(f)}
            handleSearchQuery={handleSearchQuery}
          />

          {/* Add Product Button */}
          <Button
            onClick={() => router.push("/admin/shop/products/add-products")}
            size="sm"
            className="bg-[#7c3f00] hover:text-yellow-100 hover:bg-[#7c3f00]/30"
          >
            Add Product <Plus />
          </Button>

          {/* Discount Modal */}
          <DiscountModal
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </div>
      </div>

      {/* Table */}
      <NMTable columns={columns} data={products || []} />
      <TablePagination totalPage={totalPage} />

      {/* Delete Modal */}
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageProducts;
