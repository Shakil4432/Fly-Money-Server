"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LogOut, ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "../constant";
import Logo from "@/assets/svgs/Logo";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getAllCategories } from "@/services/Category";
import CategorySidebarWithToggle from "../modules/shop/category/Category2";
import CategorySidebarForMobile from "../modules/shop/category/CategorySidebarForMobile";
import { useAppSelector } from "@/Redux/hooks";
import { orderProductsSelector } from "@/Redux/features/cartSlice";

type Category = {
  name: string;
  slug: string;
  parent: "Man" | "Woman" | "Kids" | string;
};

export default function Navbar() {
  const products = useAppSelector(orderProductsSelector);
  const pathname = usePathname();
  const router = useRouter();
  const { user, setIsLoading } = useUser();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categories, setCategories] = useState<Category[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setSearch((prev) => ({ ...prev, search: searchTerm }));
    // Optionally reload page or call API here if you want instant search
    router.push(`/products?searchTerm=${searchTerm}`);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await getAllCategories();
      setCategories(Array.isArray(response.data) ? response.data : []);
    };
    fetchCategory();
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b lg:w-full  sticky top-0 z-50 bg-white">
      <div className=" py-2 flex pr-4 lg:px-4 items-center justify-between gap-4">
        {/* Logo */}
        <div className=" flex items-center   justify-between lg:flex flex-shrink-0 w-[300px] lg:w-72 md:w-44">
          <div className=" block lg:hidden">
            <CategorySidebarForMobile></CategorySidebarForMobile>
          </div>
          <div className="ml-10 lg:ml-auto ">
            <Logo />
          </div>
        </div>

        {/* Search (hidden on small, visible on md+) */}
        <div className="hidden md:flex flex-1 max-w-lg mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search leather products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-12 py-2 border border-[#7c3f00] rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#7c3f00]/50 focus:border-none"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7c3f00] hover:bg-[#f9f5f0] px-4 py-1 rounded-md transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Right side */}
        <nav className="hidden md:flex items-center gap-4 flex-shrink-0">
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogContent className="bg-white border border-[#ddd]">
              <Input
                placeholder="Search for products"
                className="w-full bg-white text-black placeholder-gray-500 border"
              />
            </DialogContent>
          </Dialog>

          <div className="relative">
            <div className=" absolute  left-1  rounded-full flex justify-center bg-white text-red-600 mx-auto items-center">
              <span className={`${products.length === 0 ? "hidden" : "block"}`}>
                {products.length}
              </span>
            </div>
            <Link href={"/cart"}>
              <Button
                variant="outline"
                className="rounded-full size-8 lg:size-12 bg-white lg:border-[#7c3f00] text-[#7c3f00] hover:bg-[#7c3f00] hover:text-white flex items-center justify-center"
              >
                <ShoppingCart className="w-4 h-4 lg:w-8 lg:h-8" />
              </Button>
            </Link>
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className=" lg:h-12 lg:w-12  md:h-16 md:w-16 ">
                  <AvatarImage src="/profile.jpg" alt="@shakil" />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-black border">
                <DropdownMenuItem>
                  <Link href={"/profile"}>Profile</Link>{" "}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${user.role}`}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 flex items-center gap-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="lg:px-4 py-1 lg:py-2 bg-gradient-to-r from-[#7c3f00] to-yellow-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile toggle */}

        <div className="md:hidden flex items-center justify-center ">
          <div className="relative">
            <div className=" absolute  bg-opacity-0  top-2 left-3 bg-white rounded-full flex justify-center text-xs text-red-600 mx-auto items-center">
              <span className={`${products.length === 0 ? "hidden" : "block"}`}>
                {products.length}
              </span>
            </div>
            <Link href={"/cart"}>
              <Button
                variant="outline"
                className="rounded-full shadow-sm size-12 bg-white border-none lg:border-[#7c3f00] text-[#7c3f00] hover:text-[#7c3f00]/70 "
              >
                <ShoppingCart className="w-4 h-4 lg:w-6 lg:h-6" />
              </Button>
            </Link>
          </div>
          {/* {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 lg:h-20 lg:w-20 md:h-16 md:w-16 ">
                  <AvatarImage src="/profile.jpg" alt="@shakil" />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-black border">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${user.role}`}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 flex  items-center gap-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button
                variant="outline"
                className="px-2 lg:px-4 !py-0 !lg:py-2 ml-1 lg:ml-auto bg-[#FFFFFF]  text-[#7c3f00] rounded-sm font-medium  hover:shadow-xl transition"
              >
                Login
              </Button>
            </Link>
          )} */}
        </div>
      </div>

      {/* Mobile Search */}
      {/* <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-12 py-2 border border-[#7c3f00] rounded-lg bg-white focus:ring-2 focus:ring-[#7c3f00]"
          />
          <button
            type="submit"
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7c3f00] px-3 py-1 rounded-md"
          >
            Search
          </button>
        </div>
      </div> */}

      {/* Categories */}
      <div className="border-t border-[#7c3f00]/20">
        <CategorySidebarWithToggle />
      </div>
    </header>
  );
}
