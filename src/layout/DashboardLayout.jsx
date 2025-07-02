import { AppSidebar } from "@/components/app-sidebar"
import Footer from "@/components/Header/Footer"
import Header from "@/components/Header/header"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/authContext"
import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"

const SidebarAutoCollapse = () => {
  const location = useLocation();
  const { setOpen, isMobile } = useSidebar();

  useEffect(() => {
    if (!isMobile && location.pathname === "/dashboard/messages") {
      setOpen(false);  // collapse for desktop only
    } else if (!isMobile) {
      setOpen(true);   // expand for desktop only
    }
  }, [location.pathname, setOpen, isMobile]);

  return null;
};

const DashboardLayout = () => {
    const { user } = useAuth();


  return (
    <SidebarProvider  className="no-x-scroll">
      <SidebarAutoCollapse />
      <AppSidebar />
      <SidebarInset className=''>
        {location.pathname !== "/dashboard/messages" && (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ">
          <div className="flex w-full h-full items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1 md:hidden" />
            <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
            <Header />
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
        </header>
        )}

      <div className="flex flex-1 flex-col pt-0 no-x-scroll border-none mb-15 md:mb-0 scrollbar-hide">
        <Outlet />
      </div>


        <div className="fixed bottom-0 left-0 block md:hidden w-full h-10">
          <Footer />
        </div>
      </SidebarInset>

    </SidebarProvider>
  )
}

export default DashboardLayout