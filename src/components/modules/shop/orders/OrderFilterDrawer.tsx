import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { FilterIcon } from "lucide-react";

type FilterValues = {
  dateFrom?: string;
  dateTo?: string;
  status?: string; // delivery status
  paymentStatus?: string;
  paymentTypes?: string[];
};

const OrderFilterDrawer = ({
  onApply,
}: {
  onApply: (filters: FilterValues) => void;
}) => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [status, setStatus] = useState("All");
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [paymentTypes] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const handleSheetOpenChange = (next: boolean) => {
    if (!next) {
      // Sheet is closing
      setStatusOpen(false); // Close Delivery Status Select
      setPaymentOpen(false); // Close Payment Status Select
    }
    setOpen(next);
  };

  const applyFilters = () => {
    onApply({
      dateFrom,
      dateTo,
      status,
      paymentStatus,
      paymentTypes,
    });
  };

  return (
    <Sheet open={open} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-white border rounded-sm">
          <FilterIcon className="text-[#7c3f00]"></FilterIcon>
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Filter Orders</SheetTitle>
        </SheetHeader>

        {/* Date Range */}
        <div className="mt-4 space-y-2 ">
          <label className="text-sm font-medium">Order Date</label>
          <div className="flex flex-col gap-2 ">
            <div className="flex items-center justify-between gap-4">
              <span>From: </span>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span> To:</span>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Delivery Status */}
        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium">Delivery Status</label>
          <Select
            value={status}
            onValueChange={setStatus}
            open={statusOpen}
            onOpenChange={setStatusOpen}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payment Status */}
        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium">Payment Status</label>
          <Select
            value={paymentStatus}
            onValueChange={setPaymentStatus}
            open={paymentOpen}
            onOpenChange={setPaymentOpen}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payment Method */}

        <SheetFooter className="mt-6">
          <Button
            className="w-full bg-[#7c3f00] hover:bg-[#7c3f00]/60"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default OrderFilterDrawer;
