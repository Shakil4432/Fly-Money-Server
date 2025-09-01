"use client";

import { useState } from "react";
import { User, LogOut, LayoutDashboard, LogIn, Edit2 } from "lucide-react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import ProfileCard from "../settings/profile";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/components/constant";
import { usePathname, useRouter } from "next/navigation";
import ChangePassword from "./ChangePassword";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProfileDashboard = ({ userProfile }: { userProfile: any }) => {
  const [active, setActive] = useState("profile");
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-6 px-4">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-white border mt-4 rounded-sm p-4">
        <nav className="space-y-4">
          <Button
            onClick={() => setActive("profile")}
            className={`flex items-center justify-start w-full gap-2 px-3 py-2 rounded-md shadow-sm ${
              active === "profile"
                ? "bg-red-100 text-red-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <User size={18} /> My Profile
          </Button>

          <Link
            href={`/${user?.role}`}
            className="flex items-center w-full gap-2 px-3 py-2 rounded-md shadow-sm mt-2 text-gray-600 hover:bg-gray-100"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          {/* Change Password with Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center justify-start w-full gap-2 px-3 py-2 rounded-md bg-[#FFFFFF] text-gray-600 hover:bg-gray-100 shadow-sm">
                <Edit2 size={18} /> Change Password
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[500px] max-h-[500px] flex items-center justify-center">
              <div className="w-full">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Change Password
                  </DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-center mt-4">
                  <ChangePassword />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {user ? (
            <Button
              onClick={handleLogout}
              className="flex items-center justify-start w-full gap-2 px-3 py-2 rounded-md bg-[#FFFFFF] text-gray-600 hover:bg-gray-100 shadow-sm"
            >
              <LogOut size={18} /> Logout
            </Button>
          ) : (
            <Link
              href={"/login"}
              className="flex items-center justify-start w-full gap-2 px-3 py-2 rounded-md bg-[#FFFFFF] text-gray-600 hover:bg-gray-100 shadow-sm"
            >
              <LogIn size={18} /> Login
            </Link>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white rounded-lg p-4">
        {active === "profile" && <ProfileCard userProfile={userProfile} />}
      </main>
    </div>
  );
};

export default ProfileDashboard;
