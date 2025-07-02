import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useEffect, useState } from "react";
import StorySlider from "@/components/Sliders/storySlider";

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

const initialComments = [
  { user: "commenter1", text: "Nice picture!" },
  { user: "commenter2", text: "Wow, amazing view." },
  { user: "commenter3", text: "Love this!" },
  { user: "commenter4", text: "Where is this place?" },
  { user: "commenter5", text: "So peaceful and beautiful." },
];

const HomePostDialog = () => {
    // Store orientation info for each item
  const [orientations, setOrientations] = useState({});

  useEffect(() => {
    items.forEach(({ id, media }) => {
      const img = new Image();
      img.src = media;
      img.onload = () => {
        setOrientations((prev) => ({
          ...prev,
          [id]: img.naturalHeight > img.naturalWidth ? "portrait" : "landscape",
        }));
      };
    });
  }, []);

  // State arrays keyed by item index (or id)
  const [likes, setLikes] = useState(
    items.map(() => ({ liked: false, count: 123 }))
  );
  const [comments, setComments] = useState(
    items.map(() => [...initialComments])
  );
  const [commentInput, setCommentInput] = useState(
    items.map(() => "")
  );
  const [saved, setSaved] = useState(
    items.map(() => false)
  );

  const toggleLike = (index) => {
    setLikes((prev) => {
      const newLikes = [...prev];
      newLikes[index] = {
        liked: !newLikes[index].liked,
        count: newLikes[index].liked
          ? newLikes[index].count - 1
          : newLikes[index].count + 1,
      };
      return newLikes;
    });
  };

  const toggleSave = (index) => {
    setSaved((prev) => {
      const newSaved = [...prev];
      newSaved[index] = !newSaved[index];
      return newSaved;
    });
  };

  const handleCommentChange = (index, value) => {
    setCommentInput((prev) => {
      const newInputs = [...prev];
      newInputs[index] = value;
      return newInputs;
    });
  };

  const handleAddComment = (index) => {
    if (commentInput[index].trim() === "") return;

    setComments((prev) => {
      const newComments = [...prev];
      newComments[index] = [
        ...newComments[index],
        { user: "you", text: commentInput[index].trim() },
      ];
      return newComments;
    });

    setCommentInput((prev) => {
      const newInputs = [...prev];
      newInputs[index] = "";
      return newInputs;
    });
  };

  return (
        <div className="max-w-5xl mx-auto p-8 grid gap-12">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="p-8 border border-gray-200 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg"
            >
              {/* Left Column - Image */}
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <img
                  src={item.media}
                  alt={`Post ${item.id}`}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Right Column - Details */}
              <div className="flex flex-col gap-8">
                {/* User info and Follow button */}
                <div className="flex items-center gap-5">
                  <img
                    src="https://i.pravatar.cc/50?img=10"
                    alt="User Avatar"
                    className="w-14 h-14 rounded-full border-2 border-blue-500 hover:scale-110 transition-transform duration-300 cursor-pointer"
                  />
                  <div>
                    <h2 className="font-bold text-xl text-gray-900 hover:underline cursor-pointer">
                      username_here
                    </h2>
                    <p className="text-gray-500 text-sm">Location or other info</p>
                  </div>
                  <button
                    className="ml-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:from-indigo-600 hover:to-blue-500 hover:shadow-lg transition"
                  >
                    Follow
                  </button>
                </div>

                {/* Post Caption with hashtags */}
                <div className="text-gray-700 leading-relaxed text-lg">
                  <p>
                    <span className="font-semibold text-gray-900">
                      username_here
                    </span>{" "}
                    This is the post caption with some details about the photo,
                    describing the mood and moment.
                  </p>
                  <p className="text-blue-600 mt-2 space-x-2">
                    <span className="inline-block cursor-pointer hover:underline">
                      #travel
                    </span>
                    <span className="inline-block cursor-pointer hover:underline">
                      #photography
                    </span>
                    <span className="inline-block cursor-pointer hover:underline">
                      #nature
                    </span>
                  </p>
                </div>

                {/* Likes, Like and Share buttons */}
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => toggleLike(index)}
                    className={`flex items-center gap-2 text-lg font-semibold ${
                      likes[index].liked
                        ? "text-red-600"
                        : "text-gray-600 hover:text-red-600"
                    } transition`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill={likes[index].liked ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                      />
                    </svg>
                    {likes[index].count}
                  </button>

                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition cursor-pointer"
                    title="Share post"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 8a3 3 0 10-2.83-4H8a4 4 0 100 8h3.17A3 3 0 1015 8zM8 20v-4"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16h8" />
                    </svg>
                    Share
                  </button>

                  <button
                    onClick={() => toggleSave(index)}
                    className={`ml-auto flex items-center gap-2 text-lg ${
                      saved[index]
                        ? "text-yellow-500"
                        : "text-gray-400 hover:text-yellow-500"
                    } transition cursor-pointer`}
                    title="Save post"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill={saved[index] ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                      />
                    </svg>
                    Save
                  </button>
                </div>

                {/* Timestamp */}
                <p className="text-gray-400 text-sm">3 hours ago</p>

                {/* Add comment input */}
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInput[index]}
                    onChange={(e) => handleCommentChange(index, e.target.value)}
                    className="flex-grow border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onKeyDown={(e) => e.key === "Enter" && handleAddComment(index)}
                  />
                  <button
                    onClick={() => handleAddComment(index)}
                    disabled={!commentInput[index].trim()}
                    className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-md disabled:opacity-50 hover:bg-blue-700 transition"
                  >
                    Post
                  </button>
                </div>

                {/* Comments */}
                <div className="flex flex-col gap-4 overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {comments[index].map(({ user, text }, i) => (
                    <p key={i} className="border-b border-gray-200 pb-2 last:border-0">
                      <span className="font-semibold text-gray-900">{user}:</span>{" "}
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

  )
}

export default HomePostDialog