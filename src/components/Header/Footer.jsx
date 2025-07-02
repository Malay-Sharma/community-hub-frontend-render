import { Images, Plus, Search, Settings2, SquareTerminal } from 'lucide-react'
import React from 'react'
// import { NavMain } from '../nav-main'

const footer_menu = {
    NavMain: [
        {
            title: "Home",
            url: "/dashboard",
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: "Search",
            url: "/dashboard/search",
            icon: Search,
        },
        {
            title: "Create",
            url: "/dashboard/post",
            icon: Plus,
        },
        {
            title: "Collection",
            url: "/dashboard/archieve",
            icon: Images,
        },
        {
            title: "Profile",
            url: "/dashboard/profile",
            icon: Settings2,
        },
    ],
}

const Footer = () => {
  return (
    <div className="w-full bg-gray-200 fixed bottom-0 left-0 z-50 md:hidden ">
      <div className="flex items-center justify-around py-2">
        {footer_menu.NavMain.map((item) => (
          <a
            key={item.title}
            href={item.url}
            className="flex flex-col items-center text-sm text-gray-800 hover:text-black"
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{item.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Footer