import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';

export default function PostPage() {
  const [showMenu, setShowMenu] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const { media, height } = location.state || {};

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-300">


        {/* Main 2-Column Content */}
        <div className="flex flex-col md:flex-row">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 border-r border-gray-200">

        {/* Header */}
        <div className="flex md:hidden justify-between items-start p-4 border-b border-gray-200">
          <div className="flex gap-3 items-center">
            <img
              src="/waifu.jpeg"
              className="w-10 h-10 rounded-full object-cover"
              alt="User avatar"
            />
            <div>
              <h2 className="text-sm font-semibold text-gray-800">r/StyleCorner</h2>
              <p className="text-xs text-gray-500">Posted by @fashionista • 3h ago</p>
            </div>
          </div>

          {/* 3 Dot Menu */}
          <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)}>
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
            {showMenu && (
              <ul className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10 w-32 text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Report</li>
              </ul>
            )}
          </div>
        </div>


            <div>
              {media ? (
                <img
                  src={media}
                  style={{ maxHeight: "500px" }}
                  className="rounded-lg mx-auto"
                  alt={`Post ${id}`}
                />
              ) : (
                <p>Loading image or media not available...</p>
              )}
            </div>

          </div>

          {/* Right: Details */}
          <div className="w-full md:w-1/2 p-4 space-y-4">

                            {/* Header */}
        <div className="hidden md:flex justify-between items-start p-4 border-b border-gray-200">
          <div className="flex gap-3 items-center">
            <img
              src="/waifu.jpeg"
              className="w-10 h-10 rounded-full object-cover"
              alt="User avatar"
            />
            <div>
              <h2 className="text-sm font-semibold text-gray-800">r/StyleCorner</h2>
              <p className="text-xs text-gray-500">Posted by @fashionista • 3h ago</p>
            </div>
          </div>

          {/* 3 Dot Menu */}
          <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)}>
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
            {showMenu && (
              <ul className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10 w-32 text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Report</li>
              </ul>
            )}
          </div>
        </div>


            <h3 className="text-xl font-bold text-gray-900">Autumn Street Style 🍂</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Mixing neutral tones with bold accessories. Let me know what you think of this look!
            </p>

            {/* Reactions */}
            <div className="flex items-center gap-6 text-sm text-gray-600 pt-4">
              <button className="flex items-center gap-1 hover:text-red-500">
                <Heart className="w-4 h-4" /> <span>132</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-500">
                <MessageCircle className="w-4 h-4" /> <span>45</span>
              </button>
              <button className="flex items-center gap-1 hover:text-green-500">
                <Share2 className="w-4 h-4" /> <span>Share</span>
              </button>
            </div>

            {/* Extra Content: Mini users below (mobile only or extended info) */}
            <div className="p-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Users who liked this post:</h4>
            <div className="flex -space-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                <img
                    key={i}
                    src={`https://i.pravatar.cc/40?img=${i + 10}`}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white"
                />
                ))}
            </div>
            </div>
            
          </div>
        </div>


      </div>
    </main>
  );
}
