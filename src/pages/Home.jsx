import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import axios from "axios";
import 'swiper/css';
import 'swiper/css/free-mode';
import { useEffect, useState } from "react";
import StorySlider from "@/components/Sliders/storySlider";
import HomePostDialog from '@/components/DialogPages/HomePostDialog';
import HomePostDialogCopy from '@/components/DialogPages/HomePostDialogCopy';
import { useAuth } from '@/context/authContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dot, EllipsisVertical, Heart } from 'lucide-react';
import HomePostDialogHeader from '@/components/DialogPages/HomePostDialogHeader';
import SuggestionSmallDialog from '@/components/DialogPages/SuggestionSmallDialog';
import { useLocation } from 'react-router-dom';

const items = [
  { id: 1, media: "/waifu.jpeg" },
  { id: 2, media: "/luffy_chibi.jpeg" },
  { id: 3, media: "/bear.jpg" },
  { id: 4, media: "/girl.jpg" },
  { id: 5, media: "/waifu.jpeg" },
  { id: 6, media: "/luffy_chibi.jpeg" },
  { id: 7, media: "/bear.jpg" },
  { id: 8, media: "/luffy_chibi.jpeg" },
  { id: 9, media: "/waifu.jpeg" },
  { id: 10, media: "/bear.jpg" },
];

const getRandomColor = () => {
  const colors = ["#fcd34d", "#f87171", "#60a5fa", "#34d399", "#f472b6", "#a78bfa", "#facc15"];
  return colors[Math.floor(Math.random() * colors.length)];
};


const initialComments = [
  { user: "commenter1", text: "Nice picture!" },
  { user: "commenter2", text: "Wow, amazing view." },
  { user: "commenter3", text: "Love this!" },
  { user: "commenter4", text: "Where is this place?" },
  { user: "commenter5", text: "So peaceful and beautiful." },
];

const Home = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [images, setImages] = useState([]);


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const imgRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/images`, {
          withCredentials: true,
        });
        const imgData = imgRes.data;

        const imgWithPosts = await Promise.all(
          imgData.map(async (img) => {
            const postId = img.name.split("_")[0];
            try {
              const postRes = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/images/mongo/${postId}`,
                { withCredentials: true }
              );
              return {
                ...img,
                post: postRes.data.post,
              };
            } catch (err) {
              console.error(`Failed to fetch post for image ${img.name}`, err);
              return {
                ...img,
                post: null,
              };
            }
          })
        );

        setImages(imgWithPosts);
      } catch (err) {
        console.error("Failed to fetch images or posts", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api`, {
          withCredentials: true,
        });
        setAllUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchAllData();
    fetchUsers();
  }, []);

  return (
    <div className="max-w-full w-full  overflow-hidden py-4 ">
      <div className="max-w-full w-full overflow-hidden">
        
        <div className="w-full overflow-hidden md:w-[calc(100%-16rem)]">
          <StorySlider />
        </div>


        <main className="w-full md:w-[calc(100%-16rem)] h-screen flex bg-gray-100">
          <div className="w-full md:w-2/3 h-full overflow-y-auto p-6 border-r border-gray-300 scrollbar-hide">
            <div className="space-y-4">
              {images.length === 0 && (
                <div className="text-center text-gray-500">No posts to display.</div>
              )}
              {[...images].reverse().map((img) => {
                const matchedUser = allUsers.find(
                  (u) => u._id === img.post?.author?._id
                );

                return (
                  <div key={img.fileId} className="p-4 bg-white rounded shadow border-2">
                    <HomePostDialogHeader 
                      matchedUser={matchedUser} 
                      postTimestamp={img.post?.createdAt}
                    />

                    <div className="text-gray-700 leading-relaxed text-lg px-2">
                      <p>
                        <span className="font-semibold text-gray-900">
                          {/* {matchedUser?.username || "Unknown User"} */}
                        </span>{" "}
                        {img.post?.caption || "No caption provided."}
                      </p>
                      {img.post?.caption && (
                        <p className="text-blue-600 space-x-2">
                          {img.post.caption.split(" ").map((word, idx) =>
                            word.startsWith("#") ? (
                              <span
                                key={idx}
                                className="inline-block cursor-pointer hover:underline"
                              >
                                {word}
                              </span>
                            ) : null
                          )}
                        </p>
                      )}
                    </div>

                    <div
                      className="w-full flex items-center justify-center bg-gray-300"
                      style={{
                        height: "8cm",
                        // backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                      }}
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex flex-col w-1/3 h-full overflow-y-auto p-6 scrollbar-hide">
            <h2 className="text-xl font-bold mb-4">Suggestions</h2>
            <div className="space-y-4">
              {allUsers.map((usr) => (
                <div key={usr._id} className="p-4 bg-white rounded shadow">
                  <SuggestionSmallDialog user={usr} />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;