"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";

import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Shop",
      url: "/user/shop/all-products",
      icon: Bot,
      items: [
        {
          title: "Manage Products",
          url: "/user/shop/products",
        },
        {
          title: "Manage Categories",
          url: "/user/shop/category",
        },
      ],
    },

    {
      title: "Settings",
      url: "/user/profile/settings",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/user/profile/settings",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarHeader className="bg-[#090807] text-[#7c3f00]"></SidebarHeader>
      <SidebarContent className="bg-[#090807] text-[#7c3f00]">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-[#090807]">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail className="bg-[#090807]" />
    </Sidebar>
  );
}
