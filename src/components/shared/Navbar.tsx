"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LogOut, ShoppingBag } from "lucide-react";
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
    <header className="border-b w-full sticky top-0 z-50 bg-white">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0 w-32 md:w-44">
          <Logo />
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

          <Link href={"/cart"}>
            <Button
              variant="outline"
              className="rounded-full size-10 bg-white border-[#7c3f00] text-[#7c3f00] hover:bg-[#7c3f00] hover:text-white"
            >
              <ShoppingBag />
            </Button>
          </Link>

          {user ? (
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
              <DropdownMenuContent className="bg-white text-black border">
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
          ) : (
            <Link href="/login">
              <Button className="px-4 py-2 bg-gradient-to-r from-[#7c3f00] to-yellow-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile toggle */}

        <div className="md:hidden flex items-center justify-center gap-2">
          <div>
            <Link href={"/cart"}>
              <Button
                variant="outline"
                className="rounded-full size-10 bg-white border-[#7c3f00] text-[#7c3f00] hover:bg-[#7c3f00] hover:text-white"
              >
                <ShoppingBag />
              </Button>
            </Link>
          </div>
          {user ? (
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
              <Button className="px-4 py-2 bg-gradient-to-r from-[#7c3f00] to-yellow-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
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
      </div>

      {/* Categories */}
      <div className="border-t border-[#7c3f00]/20">
        <CategorySidebarWithToggle />
      </div>
    </header>
  );
}
