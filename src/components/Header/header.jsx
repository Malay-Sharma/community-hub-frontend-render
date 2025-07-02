import { Search, Settings } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useAuth } from '@/context/authContext';
import { getInitials } from '@/lib/get-initials';

const Header = () => {
  const { user } = useAuth(); 
  const initials = getInitials(user?.name);

  
  return (
<div className="flex w-full h-full py-2 align-baseline gap-2">
  <div className="flex w-full items-center gap-2 bg-gray-200 px-2 rounded-2xl">
    <Search />
    <input
      className="w-full bg-transparent border-none outline-0"
      type="text"
      placeholder="Search..."
    />
  </div>
  <div className='flex items-center '>
    <Avatar className="h-10 w-10 border-2 border-gray-300">
      {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
      <AvatarFallback className="rounded-full font-bold bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">{initials}</AvatarFallback>
    </Avatar>
  </div>
  <div className='flex items-center'>
    <Settings className=' h-10 w-10' />
  </div>

</div>

  )
}

export default Header