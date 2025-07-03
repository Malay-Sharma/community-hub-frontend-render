import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // ✅ Import Link
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import StoryViewerDialog from '../DialogPages/StoryViewerDialog';

const StorySlider = () => {
  const [stories, setStories] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchStories();
  }, []);

  
  const fetchStories = async () => {
      try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stories/imagekit`);
      setStories(res.data);
    } catch (err) {
        console.error("❌ Error fetching stories from ImageKit", err);
    }
};
const openViewer = (index) => {
    setCurrentIndex(index);
    setShowDialog(true);
    };

  return (
    <>
        <section className="w-full px-4 py-4">
      <div className="w-full overflow-hidden">
        <Swiper
          slidesPerView="auto"
          spaceBetween={12}
          freeMode={true}
          watchOverflow={true}
          centeredSlides={false}
          resistanceRatio={0}
          modules={[FreeMode]} 
        style={{ maxWidth: '100%' }}
          className="!w-full"
          breakpoints={{
            640: { slidesPerView: 'auto' },
            768: { slidesPerView: 'auto' },
            1024: { slidesPerView: 'auto' },
          }}
        >
          {/* Your Story (with Link) */}
          <SwiperSlide className="!w-auto">
            <Link to="/create-story" className="flex flex-col items-center">
              <div className="relative w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-blue-500 flex items-center justify-center hover:bg-blue-50 transition">
                <span className="text-blue-500 text-3xl font-bold">+</span>
              </div>
              <p className="mt-1 text-xs text-center text-gray-600">Your Story</p>
            </Link>
          </SwiperSlide>

          {/* ImageKit Stories */}
          {stories.map((story, index) => (
            <SwiperSlide key={story.fileId} className="!w-auto">
              <div className="flex flex-col items-center max-w-[80px] cursor-pointer" onClick={() => openViewer(index)} >
                <div className="w-20 h-20 rounded-full overflow-hidden border-2">
                  <img
                    src={story.url}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-1 text-[10px] text-center text-gray-600 break-words truncate w-full">
                  {story.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
          
        </Swiper>
      </div>
    </section>
    
    {showDialog && (
        <StoryViewerDialog
            stories={stories}
            currentIndex={currentIndex}
            onClose={() => setShowDialog(false)}
        />
        )}
    
    </>


  );
};

export default StorySlider;
