"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Heart, LogOut, Search, ShoppingBag, Menu, X } from "lucide-react";
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

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setIsLoading } = useUser();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b w-full bg-[#090807] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo centered on md+ */}
        <div className="lg:w-72 w-44">
          <Logo />
        </div>

        {/* Navigation menu center on large screens */}
        <nav className="hidden md:flex md:flex-1 md:justify-end text-lg  md:gap-6  text-gray-300">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/products" className="hover:text-white">
            Products
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </nav>

        {/* Desktop right icons and user */}
        <nav className="hidden md:flex items-center gap-2 md:flex-1 md:justify-end order-3">
          <Button
            variant="outline"
            className="rounded-full p-0 size-10 bg-[#090807] border-[#7c3f00] text-gray-300 hover:bg-[#7c3f00] hover:text-white mr-2"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search />
          </Button>
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogContent className="bg-[#090807] border border-[#333] text-white">
              <Input
                placeholder="Search for products"
                className="w-full bg-[#090807] text-white placeholder-gray-400 border border-[#3f3f3f]"
              />
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="rounded-full p-0 size-10 bg-[#090807] border-[#7c3f00] text-gray-300 hover:bg-[#7c3f00] hover:text-white"
          >
            <Heart />
          </Button>
          <Button
            variant="outline"
            className="rounded-full p-0 size-10 bg-[#090807] border-[#7c3f00] text-gray-300 hover:bg-[#7c3f00] hover:text-white"
          >
            <ShoppingBag />
          </Button>

          {user ? (
            <>
              <Link href="/create-shop">
                <Button
                  variant="outline"
                  className="rounded-full bg-[#090807] border-[#7c3f00] text-gray-300 hover:bg-[#7c3f00] hover:text-white"
                >
                  Create Shop
                </Button>
              </Link>
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/user/dashboard"}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>My Shop</DropdownMenuItem>
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

        {/* Mobile menu toggle */}
        <div className="md:hidden order-4 ml-auto">
          <button
            className="text-[#facc15]"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileOpen && (
          <nav className="w-full mt-4 flex flex-col gap-3 md:hidden order-5">
            <div className="flex items-center justify-center flex-col w-full gap-2">
              <Link
                href="/"
                onClick={() => setIsMobileOpen(false)}
                className="text-[#facc15] border w-full rounded-full text-center border-[#7c3f00] p-1 hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/products"
                onClick={() => setIsMobileOpen(false)}
                className="text-[#facc15] border w-full rounded-full text-center border-[#7c3f00] p-1 hover:text-white"
              >
                Products
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="text-[#facc15] border w-full rounded-full text-center border-[#7c3f00] p-1 hover:text-white"
              >
                Contact
              </Link>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-[#090807] border-[#7c3f00] text-[#facc15] hover:bg-[#7c3f00]"
              >
                <Heart />
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-[#090807] border-[#7c3f00] text-[#facc15] hover:bg-[#7c3f00]"
              >
                <ShoppingBag />
              </Button>
              <Button
                onClick={() => setIsSearchOpen(true)}
                variant="outline"
                className="flex-1 bg-[#090807] border-[#7c3f00] text-[#facc15] hover:bg-[#7c3f00]"
              >
                <Search />
              </Button>
            </div>

            {user ? (
              <>
                <Link href="/create-shop">
                  <Button
                    onClick={() => setIsMobileOpen(false)}
                    variant="outline"
                    className="w-full bg-[#090807] border-[#7c3f00] text-[#facc15] hover:bg-[#7c3f00]"
                  >
                    Create Shop
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild></DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#090807] text-[#facc15] border border-[#333]">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    <DropdownMenuItem>My Shop</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500 flex items-center gap-2 cursor-pointer"
                      onClick={() => {
                        setIsMobileOpen(false);
                        handleLogout();
                      }}
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
                  onClick={() => setIsMobileOpen(false)}
                  variant="outline"
                  className="px-4 md:px-4 md:py-2 py-1.5 cursor-pointer bg-gradient-to-r from-[#7c3f00] to-yellow-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Login
                </Button>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
