import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StoryDisplay = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef({});  // 👈 store video elements

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stories/imagekit`);
      setStories(res.data);
    } catch (err) {
      console.error("Error fetching stories", err);
    } finally {
      setLoading(false);
    }
  };

    const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

    const handleMouseEnter = (fileId) => {
    if (videoRefs.current[fileId]) {
      videoRefs.current[fileId].play();
    }
  };

  const handleMouseLeave = (fileId) => {
    if (videoRefs.current[fileId]) {
      videoRefs.current[fileId].pause();
      videoRefs.current[fileId].currentTime = 0;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Story Gallery</h1>

      {loading ? (
        <p className="text-center">Loading stories...</p>
      ) : stories.length === 0 ? (
        <p className="text-center">No stories found.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {stories.map((story) => (

            <Link key={story.fileId} to={`/story/${story.fileId}`}>
              <div className="relative aspect-[6/8] overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white group hover:shadow-xl transition-shadow duration-300">
                <img
                  src={story.url}
                  alt={story.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 group-hover:-scale-x-100"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {formatDate(story.createdAt)}
                  </span>
                </div>
              </div>
            </Link>
            // <div
            //   key={story.fileId}
            //   className="aspect-[6/8] overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white group hover:shadow-xl transition-shadow duration-300"
            //   onMouseEnter={() => handleMouseEnter(story.fileId)}
            //   onMouseLeave={() => handleMouseLeave(story.fileId)}
            // >
            //   <video
            //     ref={(el) => (videoRefs.current[story.fileId] = el)}
            //     src={story.url}
            //     className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                
            //     playsInline
            //   />
            // </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryDisplay;
