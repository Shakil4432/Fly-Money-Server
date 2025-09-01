"use client";

import Link from "next/link";
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useUser } from "@/context/UserContext";

const MobileBottomNav = () => {
  const { user } = useUser();
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-between px-6 py-2 md:hidden z-50">
      <Link
        href="/"
        className="flex flex-col items-center text-xs text-gray-800 hover:text-red-500"
      >
        <Home size={22} />
        <span>Home</span>
      </Link>

      <Link
        href="/search"
        className="flex flex-col items-center text-xs text-gray-800 hover:text-[#7c3f00]"
      >
        <Search size={22} />
        <span>Search</span>
      </Link>

      <Link
        href="/user/wishlist"
        className="flex flex-col items-center text-xs text-gray-800 hover:text-[#7c3f00]"
      >
        <Heart size={22} />
        <span>Wishlist</span>
      </Link>

      {user?.role === "user" ? (
        <Link
          href="/user/orders"
          className="flex flex-col items-center text-xs text-gray-800 hover:text-[#7c3f00]"
        >
          <ShoppingBag size={22} />
          <span>Orders</span>
        </Link>
      ) : (
        <Link
          href="/admin/shop/order"
          className="flex flex-col items-center text-xs text-gray-800 hover:text-[#7c3f00]"
        >
          <ShoppingBag size={22} />
          <span>Orders</span>
        </Link>
      )}

      <Link
        href="/profile"
        className="flex flex-col items-center text-xs text-gray-800 hover:text-[#7c3f00]"
      >
        <User size={22} />
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default MobileBottomNav;
