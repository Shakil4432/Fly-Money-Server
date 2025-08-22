"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { FilterIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterValues = {
  sort?: string;
  role?: string;
  userStatus?: string;
};

const UserFilterDrawer = ({
  onApply,
}: {
  onApply: (filters: FilterValues) => void;
}) => {
  const [open, setOpen] = useState(false);

  const [roleOpen, setRoleOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [role, setRole] = useState("All");
  const [sortValue, setSortValue] = useState("");
  const [userStatus, setUserStatus] = useState("All");

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handleSheetOpenChange = (next: boolean) => {
    if (!next) {
      setRoleOpen(false);
      setStatusOpen(false);
      setSortOpen(false);
    }
    setOpen(next);
  };

  // Handle query updates
  const handleSearchQuery = (key: string, value: string | number | boolean) => {
    const currentParams = Object.fromEntries(searchParams.entries());

    const updatedParams: Record<string, string> = { ...currentParams };

    // Convert isActive string to string for backend (true/false)
    if (key === "isActive") {
      if (value === "true") updatedParams[key] = "true";
      else if (value === "false") updatedParams[key] = "false";
      else delete updatedParams[key];
    } else {
      updatedParams[key] = value.toString();
    }

    // Remove empty or "All"
    Object.keys(updatedParams).forEach((k) => {
      if (updatedParams[k] === "" || updatedParams[k] === "All") {
        delete updatedParams[k];
      }
    });

    const queryString = new URLSearchParams(updatedParams).toString();
    router.push(`${pathName}?${queryString}`, { scroll: false });
  };

  const applyFilters = () => {
    onApply({
      sort: sortValue,
      role,
      userStatus,
    });
    setOpen(false);
  };

  const clearFilters = () => {
    setRole("All");
    setSortValue("");
    setUserStatus("All");
    router.push(pathName, { scroll: false });
  };

  return (
    <Sheet open={open} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-white border rounded-sm">
          <FilterIcon className="text-[#7c3f00]" />
          Filter
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Filter Users</SheetTitle>
        </SheetHeader>

        {/* Sort By */}
        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium">Sort By</label>
          <Select
            value={sortValue}
            onValueChange={(val) => {
              setSortValue(val);
              handleSearchQuery("sort", val);
            }}
            open={sortOpen}
            onOpenChange={setSortOpen}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sort" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="-name">Name (Z-A)</SelectItem>
              <SelectItem value="-createdAt">Newest First</SelectItem>
              <SelectItem value="createdAt">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* User Role */}
        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium">User Role</label>
          <Select
            value={role}
            onValueChange={(val) => {
              setRole(val);
              handleSearchQuery("role", val);
            }}
            open={roleOpen}
            onOpenChange={setRoleOpen}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* User Status */}
        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium">User Status</label>
          <Select
            value={userStatus}
            onValueChange={(val) => {
              setUserStatus(val);
              handleSearchQuery("isActive", val);
            }}
            open={statusOpen}
            onOpenChange={setStatusOpen}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select user status" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <SheetFooter className="mt-6 flex gap-2">
          <Button
            className="w-full bg-[#7c3f00] hover:bg-[#7c3f00]/60"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full" onClick={clearFilters}>
            Clear
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UserFilterDrawer;
