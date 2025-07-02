import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dot, EllipsisVertical, User } from 'lucide-react';
import { getInitials } from '@/lib/get-initials';

const SuggestionSmallDialog = ({ user }) => {
  const initials = getInitials(user?.name);

  return (
    <div className='flex items-center justify-between px-2'>
      <div className='flex items-center justify-start gap-4'>
        <Avatar className="h-28 w-28 rounded-full size-10 border-2 ">

        

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
        <div className='flex flex-col gap-0.5'>
          <div className='flex items-center justify-between w-full'>
            <p>{user?.email || "Guest"}</p>
            <Dot className='text-blue-600' />
            <span className='text-blue-600'>Follow</span>
          </div>
        </div>
      </div>

      <EllipsisVertical />
    </div>
  );
};

export default SuggestionSmallDialog;
