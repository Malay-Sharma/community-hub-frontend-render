"use client"

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/authContext";


export function NavMain({ items }) {
  const { user } = useAuth();
  const location = useLocation(); // 🔥 Get current path
  const currentPath = location.pathname;

  return (
    <SidebarGroup className='p-0 overflow-y-auto scrollbar-hide'>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = currentPath === item.url;

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible rounded-sm"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <Link
                    to={item.url}
                    state={{ user }}
                    className={`flex items-center gap-2 py-2 px-2 text-base transition duration-200 rounded-md ${
                      isActive
                        ? "bg-gray-300 font-semibold"
                        : "hover:bg-gray-300 font-normal"
                    }`}
                  >
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

// export function NavMain({
//   items
// }) {
//   const { user } = useAuth(); // 🔥 This provides `user`
//   const location = useLocation(); // 🔥 Get current path
//   const currentPath = location.pathname;
//   console.log("🔥 Logged-in User from useAuth:", user);

//   return (
//     (<SidebarGroup className='p-0 overflow-y-auto scrollbar-hide' >
//       {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
//       <SidebarMenu>
//         {items.map((item) => (
//           <Collapsible
//             key={item.title}
//             asChild
//             defaultOpen={item.isActive}
//             className="group/collapsible rounded-sm">
//             <SidebarMenuItem >
//               <CollapsibleTrigger asChild>
//                   <Link
//                     to={item.url}
//                     state={{ user: user }}
//                     className="flex items-center gap-2 py-2 text-base hover:bg-gray-300 transition duration-200 "
//                   >
//                 <SidebarMenuButton tooltip={item.title} className='hover:bg-gray-300'>
//                     {item.icon && <item.icon className="font-normal bg-transparent" />}
//                     <span className="font-normal bg-transparent">{item.title}</span>

//                   {/* <ChevronRight */}
//                     {/* className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
//                 </SidebarMenuButton>
//                   </Link>
//               </CollapsibleTrigger>
//               {/* <CollapsibleContent>
//                 <SidebarMenuSub>
//                   {item.items?.map((subItem) => (
//                     <SidebarMenuSubItem key={subItem.title}>
//                       <SidebarMenuSubButton asChild>
//                         <a href={subItem.url}>
//                           <span>{subItem.title}</span>
//                         </a>
//                       </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                   ))}
//                 </SidebarMenuSub>
//               </CollapsibleContent> */}
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>)
//   );
// }
