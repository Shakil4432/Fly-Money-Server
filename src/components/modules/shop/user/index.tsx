"use client";

import { NMTable } from "@/components/ui/core/NMTable/index";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";
import { IMeta } from "@/types/meta";
import DeleteConfirmationModal from "@/components/ui/core/NMModal/DeleteConfirmModal";
import { deleteProduct } from "@/services/products";
import { toast } from "sonner";
import { UserInfo } from "@/types/userInfo";
import UserFilterDrawer from "./UserFilterDrawer";
import { Input } from "@/components/ui/input";
import UserStatusUpdateModal from "./UserStatusUpdateModal";
import { Switch } from "@/components/ui/switch";
import { changeUserStatus } from "@/services/user";

const ManageUsers = ({ user, meta }: { user: UserInfo[]; meta: IMeta }) => {
  const { totalPage } = meta;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isStatusModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = (data: UserInfo) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleView = (product: UserInfo) => {
    router.push(`/admin/shop/user/${product._id}`);
  };

  // const handleDeleteConfirm = async () => {
  //   try {
  //     if (selectedId) {
  //       const res = await deleteProduct(selectedId);
  //       if (res.success) {
  //         toast.success(res.message);
  //         setModalOpen(false);
  //       } else {
  //         toast.error(res.message);
  //       }
  //     }
  //   } catch (err: any) {
  //     console.error(err?.message);
  //   }
  // };

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    // Optionally reload page or call API here if you want instant search
    router.push(`?searchTerm=${searchTerm}`);
  };

  const handleUserStatus = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<UserInfo>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
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
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              setSelectedIds((prev) => [...prev, row.original._id]);
            } else {
              setSelectedIds((prev) =>
                prev.filter((id) => id !== row.original._id)
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
      header: "Name",
      cell: ({ row }) => (
        <div className={`flex items-center space-x-3`}>
          <Image
            src={"https://github.com/shadcn.png"}
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
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.original?.email}</span>,
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-gray-800 text-xs ${
            row.original.isActive ? "bg-green-400/40" : "bg-red-500/80"
          }`}
        >
          {row.original.isActive ? "active" : "block"}
        </span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <span>{row.original?.role}</span>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const date = new Date(row.original?.createdAt);
        return <span>{date.toLocaleDateString()}</span>;
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const [active, setActive] = useState(row.original.isActive); // local state

        const handleToggle = async (value: boolean) => {
          setActive(value);

          try {
            const res = await changeUserStatus(row.original._id);
            console.log(res);
            if (res.success) {
              toast.success(res.message);
            }
          } catch (err) {
            toast.error("Failed to update status!");
            setActive(!value); // rollback if failed
          }
        };

        return (
          <div className="flex items-center gap-4 space-x-3">
            {/* View */}
            <button title="View" onClick={() => handleView(row.original)}>
              <Eye className="w-5 h-5" />
            </button>

            {/* Toggle */}
            <Switch
              checked={active}
              onCheckedChange={handleToggle}
              className="h-3 w-10 bg-gray-300 
             data-[state=checked]:bg-[#7c3f00]/30  // 🔥 active color
             relative rounded-full transition-colors"
            >
              <span
                className="block h-6 w-6 translate-x-1 rounded-full bg-white 
               transition-transform data-[state=checked]:translate-x-7"
              />
            </Switch>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between py-3">
        <h1 className="text-2xl font-bold text-[#7c3f00] mb-4">Manage Users</h1>
        <div className="flex items-center gap-2">
          {/* Search Field */}
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

          {/* Filter Drawer */}
          <UserFilterDrawer onApply={(f) => setFilters(f)} />
        </div>
      </div>

      <NMTable columns={columns} data={user || []} />
      <TablePagination totalPage={totalPage} />

      {/* <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      /> */}
    </div>
  );
};

export default ManageUsers;
