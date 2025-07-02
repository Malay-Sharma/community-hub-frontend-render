import { useAuth } from '@/context/authContext'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { EllipsisVertical } from 'lucide-react'
import { getInitials } from '@/lib/get-initials'

const HomePostDialogCopy = () => {

  const {user} = useAuth()
  const initials = getInitials(user?.name);
  
  return (
    <main  className="max-w-5xl mx-auto  grid gap-12 ">
        <div className="p-2 border border-gray-200 rounded-xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg">
          <div>
            <img src="/waifu.jpeg" alt="" className='rounded-l-2xl' />
          </div>
          <div className='bg-pink-500 rounded-r-2xl flex flex-row '>
            <div>
              <Avatar className="h-28 w-28 rounded-full">
                {(user?.avatar && user.avatar.trim() !== "") || (user?.photo && user.photo.trim() !== "") ? (
                  <AvatarImage
                    src={user.avatar?.trim() || user.photo?.trim()}
                    alt={user.name}
                    className="rounded-lg"
                  />
                ) : (
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p>Name ...</p>
                <span>sjb</span>
              </div>
              <EllipsisVertical />
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
    </main>
  )
}

export default HomePostDialogCopy