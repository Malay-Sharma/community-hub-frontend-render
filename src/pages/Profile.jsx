import { AppSidebar } from '@/components/app-sidebar'
import { EditProfileDialog } from '@/components/DialogPages/EditProfileDialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/authContext';
import { getInitials } from '@/lib/get-initials';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Settings } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Profile = () => {
  const { user, loading } = useAuth();

  const initials = getInitials(user?.name);

  if (loading) {
    return (
      <main className="w-full min-h-screen flex justify-center items-center bg-black text-white">
        <p>Loading profile...</p>
      </main>
    );
  }

  const [allUsers, setAllUsers] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:4000/api");
      const data = await res.json();
      setAllUsers(data);
    } catch (error) {
      console.error("Failed to fetch all users:", error);
    }
  };

  fetchUsers();
}, []);


  // if (!user) {
  //   return (
  //     <main className="w-full min-h-screen flex justify-center items-center bg-black text-white">
  //       <p>User not logged in.</p>
  //     </main>
  //   );
  // }

  return (
    <main className="w-full h-full  bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] ">
      <div className=" gap-8 w-full ">

        <div className="flex gap-8 p-6  border-b-2 ">

        <Avatar className="h-28 w-28 rounded-full border-2 border-">
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

        {/* Profile Info */}
        <div className="text-white space-y-2 flex flex-col items-baseline justify-baseline">
          <p className="text-base"> {user?.email}</p>
          <div className='flex gap-8'>
            <p><span>0</span> post</p>
            <p><span>0</span> followers</p>
            <p><span>0</span> following</p>
          </div>
          <h1 className="text-xl font-medium">@{user?.name || "Guest"} </h1>
          <div className='flex gap-2 mt-2 items-center'>
            <EditProfileDialog />
            <EditProfileDialog />
            <Settings />
          </div>

        </div>
        </div>



      </div>

      <div className=' w-full py-2   flex flex-col h-full'>
        <Tabs defaultValue="myfriend" className="">

          <div className='border-b-2 border-b-[#C4C4C4] px-2 py-2' > 
            <TabsList className='bg-transparent  '>
              <TabsTrigger value="mypost" className="bg-gray-200 hover:bg-transparent hover:text-white">Posts</TabsTrigger>
              <TabsTrigger value="myfriend" className="bg-gray-200 hover:bg-transparent hover:text-white">Friends</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="mypost" className='text-white'>Make changes to your account here.</TabsContent>
          <TabsContent value="myfriend">
            <div className='px-2'>
              <div className="mt-6 text-white">
                <ul className="list-disc ml-6 mt-2 ">
                <h2 className="text-xl font-black px-2 ">Friends:</h2>
                {allUsers.map((u) => (
                  <li key={u._id} className='flex gap-2 py-2 mb-2 px-2'>
                            <Avatar className="h-28 w-28 rounded-full size-10 border-2">
          {(u?.avatar && u.avatar.trim() !== "") || (u?.photo && u.photo.trim() !== "") ? (
            <AvatarImage
              src={u.avatar?.trim() || u.photo?.trim()}
              alt={u.name}
              className="rounded-lg"
            />
          ) : (
            <AvatarFallback className="rounded-lg text-pink-500 font-black">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>  
          
          <div className='flex flex-col px-2'>
             <div className='font-black'>{u.name}</div>
             <div className='italic'>{u.email}</div>
             {/* <div>{u.gender}</div> */}
          </div>
             
             </li>
                ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </main>

  )
}

export default Profile