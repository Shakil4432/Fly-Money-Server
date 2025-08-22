"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Heart,
  LogOut,
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
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

type Category = {
  name: string;
  slug: string;
  parent: "Man" | "Woman" | "Kids" | string;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setIsLoading } = useUser();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await getAllCategories();
      // response.data is your array of categories
      setCategories(Array.isArray(response.data) ? response.data : []);
    };

    fetchCategory();
  }, []);

  // Group categories by parent
  const groupedCategories = categories.reduce((acc, category) => {
    const key = category.parent || "Others";
    if (!acc[key]) acc[key] = [];
    acc[key].push(category);
    return acc;
  }, {} as Record<string, Category[]>);

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b w-full sticky top-0 z-50  bg-[#FFFFFF] text-white  ">
      <div className=" px-4 py-3 flex flex-wrap items-center justify-between gap-4 ">
        {/* Logo */}
        <div className="lg:w-72 w-44">
          <Logo />
        </div>

        {/* Navigation menu center (Desktop) */}
        <div className="w-full max-w-lg mx-auto ml-96">
          <div className="relative">
            <input
              type="text"
              placeholder="Search leather products..."
              className="w-full pl-4 pr-12 py-2 border border-[#7c3f00] rounded-lg bg-[#FFFFFF]/50  focus:outline-none focus:ring-2 focus:ring-[#7c3f00] focus:border-[#7c3f00]"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7c3f00]  hover:bg-[#FFFFFF]/50 px-4 py-1 rounded-md transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Right side icons and user profile */}
        <nav className="hidden md:flex items-center gap-4 md:flex-1 md:justify-end order-3">
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogContent className="bg-[#090807] border border-[#333] text-white">
              <Input
                placeholder="Search for products"
                className="w-full bg-[#090807] text-white placeholder-gray-400 border border-[#3f3f3f]"
              />
            </DialogContent>
          </Dialog>

          <Link href={"/cart"}>
            <Button
              variant="outline"
              className="rounded-full p-0 size-10 bg-[#FFFFFF] border-[#7c3f00] text-[#7c3f00] hover:bg-[#7c3f00] hover:text-white"
            >
              <ShoppingBag />
            </Button>
          </Link>

          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#090807] text-white border border-[#333]">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
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
            </>
          ) : (
            <Link href="/login">
              <Button
                variant="outline"
                className="px-4 md:px-4 md:py-2 py-1.5 cursor-pointer bg-gradient-to-r from-[#7c3f00] to-yellow-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile toggle (unchanged) */}
        <div className="md:hidden order-4 ml-auto">
          <button
            className="text-[#facc15]"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      <div className="border border-t-[#7c3f00]/20">
        <CategorySidebarWithToggle></CategorySidebarWithToggle>
      </div>
    </header>
  );
}
