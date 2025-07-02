import { useAuth } from '@/context/authContext';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dot, EllipsisVertical } from 'lucide-react';
import { getInitials } from '@/lib/get-initials';
import { PostDropDown } from '../DropDown/PostDropDown';
import { useLocation } from 'react-router-dom';

const getTimeAgo = (timestamp) => {
  const now = new Date();
  const postTime = new Date(timestamp);
  const diffMs = now - postTime;
  
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  
  if (diffSec < 60) return `${diffSec} sec ago`;
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr} hr${diffHr > 1 ? 's' : ''} ago`;
  return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
};

const HomePostDialogHeader = ({ matchedUser, postTimestamp }) => {
  const initials = getInitials(matchedUser?.name || matchedUser?.username);
  const { user } = useAuth();

  const info = useLocation();
  const userInfo = info.state?.user || user;

  return (
    <div className='flex items-center justify-between px-2'>
      <div className='flex items-center justify-start gap-4'>
        <Avatar className="h-28 w-28 rounded-full size-10 border-2 ">
          {userInfo?.avatar && userInfo.avatar.trim() !== "" ? (
            <AvatarImage
              src={userInfo.avatar.trim()}
              alt={userInfo.name || userInfo.username}
              className="rounded-lg"
            />
          ) : (
            <AvatarFallback className="rounded-lg">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
        <div className='flex flex-col gap-0.5'>
          <div className='flex items-center'>
            <p>{userInfo?.name || matchedUser?.username || "Guest"}</p>
            <Dot className='text-blue-600' />
            <span className='text-blue-600'>Follow</span>
          </div>
          <p className='text-muted-foreground text-sm'>
            {postTimestamp ? getTimeAgo(postTimestamp) : 'Just now'}
          </p>
        </div>
      </div>
      <EllipsisVertical />
      {/* <PostDropDown /> */}
    </div>
  );
};

export default HomePostDialogHeader;
