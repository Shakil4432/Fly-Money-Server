"use client";

import React, { useMemo, useState } from "react";

import { NMTable } from "@/components/ui/core/NMTable";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Edit } from "lucide-react";

import TablePagination from "@/components/ui/core/NMTable/TablePagination";

import UpdateStatusModal from "./UpdateStatusModal";
import OrderFilterDrawer from "./OrderFilterDrawer";

const getStatusColor = (status: string, type: "payment" | "delivery") => {
  if (type === "payment") {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  } else {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
};

type Product = {
  _id: string;
  name: string;
  price: number;
  brand: string;
  imageUrls: string[];
};

type OrderProduct = {
  product: Product;
  quantity: number;
  color: string;
  unitPrice: number;
  _id: string;
};

type User = {
  name: string;
  email: string;
  role: string;
};

type Order = {
  _id: string;
  user: User;
  products: OrderProduct[];
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  finalAmount: number;
  createdAt: string;
  shippingAddress: string;
};

type OrderFilters = {
  status?: string;
  paymentStatus?: string;
  customerName?: string;
  dateFrom?: string;
  dateTo?: string;
};

const ManageOrders = ({
  orders,
  totalPage,
}: {
  orders: Order[];
  totalPage: number;
}) => {
  const [selectedId, setSelectedId] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState<OrderFilters>({});

  const filteredOrders = useMemo(() => {
    return (orders ?? []).filter((order) => {
      const matchDeliveryStatus =
        filters.status && filters.status !== "All"
          ? order.status === filters.status
          : true;
      const matchPaymentStatus =
        filters.paymentStatus && filters.paymentStatus !== "All"
          ? order.paymentStatus === filters.paymentStatus
          : true;

      const matchDate =
        filters.dateFrom && filters.dateTo
          ? new Date(order.createdAt) >= new Date(filters.dateFrom) &&
            new Date(order.createdAt) <= new Date(filters.dateTo)
          : true;
      return matchDeliveryStatus && matchPaymentStatus && matchDate;
    });
  }, [orders, filters]);

  // const handleDelete = (order: Order) => {
  //   setSelectedId(order?._id);
  //   setSelectedItem(order?.orderNumber || order?._id);
  //   setModalOpen(true);
  // };

  // const handleView = (order: Order) => {
  //   router.push(`/admin/shop/orders/${order._id}`);
  // };

  // const handleDeleteConfirm = async () => {
  //   try {
  //     if (selectedId) {
  //       const res = await deleteOrder(selectedId);
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

  const handleUpdateStatus = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true); // open modal on edit click
  };

  const columns: ColumnDef<Order>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       className="border-[#7c3f00] !text-[#7c3f00]"
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       className="border-[#7c3f00] !text-[#7c3f00]"
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => {
    //         if (value) {
    //           setSelectedIds((prev) => [...prev, row.original._id]);
    //         } else {
    //           setSelectedIds((prev) =>
    //             prev.filter((id) => id !== row.original._id)
    //           );
    //         }
    //         row.toggleSelected(!!value);
    //       }}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "orderId",
      header: "Order ID",
      cell: ({ row }) => (
        <span className="font-medium">{row.original._id}</span>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row }) => <span>{row.original.user.name}</span>,
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            row.original.paymentStatus,
            "payment"
          )}`}
        >
          {row.original.paymentStatus}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Delivery Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            row.original.status,
            "delivery"
          )}`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      cell: ({ row }) => <span>$ {row.original.totalAmount.toFixed(2)}</span>,
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-blue-500"
            title="View"
            // onClick={() => handleView(row.original)}
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() => handleUpdateStatus(row.original._id)}
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between p-3">
        <h1 className="text-xl font-bold text-[#7c3f00] ">Manage Orders</h1>
        <div className="flex items-center gap-2 flex-col ">
          <div className="flex items-center gap-2 ">
            <OrderFilterDrawer onApply={(f) => setFilters(f)} />
          </div>
        </div>
      </div>
      <NMTable columns={columns} data={filteredOrders || []} />
      <UpdateStatusModal
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      ></UpdateStatusModal>
      <TablePagination totalPage={totalPage} />
      {/* <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        // onConfirm={handleDeleteConfirm}
      /> */}
    </div>
  );
};

export default ManageOrders;
