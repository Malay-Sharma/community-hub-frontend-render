"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/authContext"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getInitials } from "@/lib/get-initials"
// import { EditProfileDialog } from "@/components/Profile";
import { useState } from "react";
import { EditProfileDialog } from "./DialogPages/EditProfileDialog"

export function NavUser({
  user
}) {
  const { isMobile } = useSidebar();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { logout } = useAuth(); // this clears the user state
  const navigate = useNavigate();
  // const { user } = useAuth();
    const info = useLocation();
  const userInfo = info.state?.user || user;
  const initials = getInitials(userInfo?.name);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include", // send cookies
      });

      const data = await res.json();

      if (data.success) {
        logout(); // clears frontend user state
        navigate("/"); // redirects to login page
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (!user) return null;


  return (
    (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
               <Avatar className="h-8 w-8 rounded-lg">
                  {(userInfo?.avatar && userInfo.avatar.trim() !== "") || (userInfo?.photo && userInfo.photo.trim() !== "") ? (
                    <AvatarImage
                      src={userInfo.avatar?.trim() || userInfo.photo?.trim()}
                      alt={userInfo.name}
                      className="rounded-lg"
                    />
                  ) : (
                    <AvatarFallback className="rounded-lg">
                      {initials}
                    </AvatarFallback>
                  )}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userInfo.name}</span>
                <span className="truncate text-xs">{userInfo.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
               <Avatar className="h-8 w-8 rounded-lg">
                  {(userInfo?.avatar && userInfo.avatar.trim() !== "") || (userInfo?.photo && userInfo.photo.trim() !== "") ? (
                    <AvatarImage
                      src={userInfo.avatar?.trim() || userInfo.photo?.trim()}
                      alt={userInfo.name}
                      className="rounded-lg"
                    />
                  ) : (
                    <AvatarFallback className="rounded-lg">
                      {initials}
                    </AvatarFallback>
                  )}
              </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userInfo.name}</span>
                  <span className="truncate text-xs">{userInfo.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to='/dashboard/profile'>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} variant="destructive">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>)
  );
}
