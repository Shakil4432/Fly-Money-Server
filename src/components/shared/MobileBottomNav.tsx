"use client";
import Link from "next/link";
import { Home, Search, Heart, ShoppingBag, User, X } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const MobileBottomNav = () => {
  const { user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearch = () => {
    setSearch((prev) => ({ ...prev, search: searchTerm }));
    router.push(`/products?searchTerm=${searchTerm}`);
    setSearchOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-between px-6 py-2 md:hidden z-40">
        <Link
          href="/"
          className="flex flex-col items-center text-xs font-bold text-gray-800 hover:text-red-500"
        >
          <Home size={22} />
          <span>Home</span>
        </Link>
        <div
          onClick={() => setSearchOpen(true)}
          className="flex flex-col items-center border-black hover:bg-white !p-0 text-xs font-bold text-gray-800 hover:text-[#7c3f00]"
        >
          <Search size={22} />
          <span className="border-black">Search</span>
        </div>
        <Link
          href="/user/wishlist"
          className="flex flex-col items-center text-xs font-bold text-gray-800 hover:text-[#7c3f00]"
        >
          <Heart size={22} />
          <span>Wishlist</span>
        </Link>
        {user?.role === "user" ? (
          <Link
            href="/user/orders"
            className="flex flex-col items-center text-xs font-bold text-gray-800 hover:text-[#7c3f00]"
          >
            <ShoppingBag size={22} />
            <span>Orders</span>
          </Link>
        ) : (
          <Link
            href="/admin/shop/order"
            className="flex flex-col items-center text-xs font-bold text-gray-800 hover:text-[#7c3f00]"
          >
            <ShoppingBag size={22} />
            <span>Orders</span>
          </Link>
        )}
        <Link
          href="/profile"
          className="flex flex-col items-center text-xs font-bold text-gray-800 hover:text-[#7c3f00]"
        >
          <User size={22} />
          <span>Profile</span>
        </Link>
      </nav>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 md:hidden">
          <div className="bg-white rounded-lg w-full max-w-md p-4 animate-in fade-in-90 zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Search Products</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(false)}
                className="h-8 w-8"
              >
                <X size={18} />
              </Button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="w-full pl-4 pr-12 py-3 border border-[#7c3f00] rounded-lg bg-white focus:ring-2  focus:outline-none"
              />
              <button
                type="submit"
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#7c3f00] text-white px-3 py-1 rounded-md hover:bg-[#6a3600]"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileBottomNav;
