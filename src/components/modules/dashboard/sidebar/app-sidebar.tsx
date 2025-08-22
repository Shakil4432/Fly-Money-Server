"use client";

import * as React from "react";
import { Bot, Settings2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { getCurrentUser } from "@/services/AuthService";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<any>(null);
  const [navItems, setNavItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await getCurrentUser();
        setUser(userInfo);

        if (!userInfo) return;

        let menu: any[] = [];

        if (userInfo.role === "admin") {
          menu = [
            {
              title: "Shop",
              url: "/admin/shop/all-products",
              icon: Bot,
              items: [
                { title: "Manage Products", url: "/admin/shop/products" },
                { title: "Manage Categories", url: "/admin/shop/category" },
                { title: "Manage Orders", url: "/admin/shop/order" },
                { title: "Manage Users", url: "/admin/shop/user" },
              ],
            },
            {
              title: "Settings",
              url: "/admin/settings",
              icon: Settings2,
              items: [{ title: "Profile", url: "/admin/settings/profile" }],
            },
          ];
        } else if (userInfo.role === "user") {
          menu = [
            {
              title: "Shop",
              url: "/user/shop/all-products",
              icon: Bot,
              items: [
                { title: "My Orders", url: "/user/orders" },
                { title: "Wishlist", url: "/user/wishlist" },
              ],
            },
            {
              title: "Settings",
              url: "/user/profile/settings",
              icon: Settings2,
              items: [{ title: "Profile", url: "/user/settings/profile" }],
            },
          ];
        }

        setNavItems(menu);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className=" text-[#7c3f00]" />
      <SidebarContent className=" text-[#7c3f00]">
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter className="">
        {user && (
          <NavUser
            user={{
              name: user?.name || "Unknown User",
              email: user?.email || "no-email@example.com",
              avatar: user?.avatar || "/default-avatar.png",
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail className="" />
    </Sidebar>
  );
}
