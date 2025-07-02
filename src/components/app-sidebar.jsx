import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Search,
  Settings2,
  SquareTerminal,
  Telescope,
  Images,
  MessageSquareMore,
  Bell,
  Plus,
  MessageCircle
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const sidebar_menu = {
  user: {
    name: "Malay Sharma",
    email: "malaysharma0001@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Search",
      url: "/dashboard/search",
      icon: Search ,
    },
    {
      title: "Community",
      url: "/dashboard/explore",
      icon: Telescope,
    },
    {
      title: "Posts",
      url: "/dashboard/archieve",
      icon: Bot,
    },
    {
      title: "Stories",
      url: "/dashboard/story",
      icon: Images,
    },
    {
      title: "Messages",
      url: "/dashboard/messages",
      icon: MessageSquareMore,
    },
    {
      title: "Update",
      url: "/onboard/step1",
      icon: Bell,
    },
    {
      title: "Comments",
      url: "#",
      icon: MessageCircle,
    },
    {
      title: "Create",
      url: "/dashboard/image-upload",
      icon: Plus,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: Bot,
    },
    {
      title: "Settings",
      url: "/dashboard/setting",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {

  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebar_menu.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebar_menu.navMain} />
        {/* <NavProjects projects={sidebar_menu.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebar_menu.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
