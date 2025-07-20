import { AppSidebar } from "@/components/modules/dashboard/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider className="bg-[#090807]">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 bg-[#090807] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 bg-[#090807]">
            <SidebarTrigger className="-ml-1 bg-[#090807]" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="bg-[#090807]">
              <BreadcrumbList className="bg-[#090807]">
                <BreadcrumbItem className="hidden md:block bg-[#090807]">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-[#090807] pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-gray-950 md:min-h-min">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
