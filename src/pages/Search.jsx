import GalleryItem from '@/components/Gallery/galleryItem';
import { Card } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'
import axios from "axios";

// const items = [
//   { id: 1, media: "/waifu.jpeg", width: 1920, height: 1080 },
//   { id: 2, media: "/luffy_chibi.jpeg", width: 1280, height: 720 },
//   { id: 3, media: "/bear.jpg", width: 800, height: 600 },
//   { id: 4, media: "/girl.jpg", width: 1024, height: 768 },
//   { id: 5, media: "/waifu.jpeg", width: 640, height: 480 },
//   { id: 6, media: "/luffy_chibi.jpeg", width: 1920, height: 1080 },
//   { id: 7, media: "/bear.jpg", width: 1280, height: 720 },
//   { id: 8, media: "/luffy_chibi.jpeg", width: 2048, height: 1152 },
//   { id: 9, media: "/waifu.jpeg", width: 1600, height: 900 },
//   { id: 10, media: "/bear.jpg", width: 1366, height: 768 },
//   { id: 11, media: "/luffy_chibi.jpeg", width: 2560, height: 1440 },
//   { id: 12, media: "/waifu.jpeg", width: 3840, height: 2160 },
//   { id: 13, media: "/girl.jpg", width: 1920, height: 1080 },
//   { id: 14, media: "/luffy_chibi.jpeg", width: 1024, height: 1024 },
//   { id: 15, media: "/bear.jpg", width: 720, height: 1280 },
//   { id: 16, media: "/waifu.jpeg", width: 1920, height: 800 },
//   { id: 17, media: "/luffy_chibi.jpeg", width: 600, height: 600 },
//   { id: 18, media: "/girl.jpg", width: 2560, height: 1600 },
//   { id: 19, media: "/luffy_chibi.jpeg", width: 1440, height: 1080 },
//   { id: 20, media: "/waifu.jpeg", width: 1200, height: 900 },
// ];

const Search = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/images", {
          withCredentials: true,
        });
        setImages(res.data);
      } catch (err) {
        console.error("Failed to fetch images", err);
      }
    };
    fetchImages();
  }, []);



  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-4 py-2 px-2 ">
      {images.map(img => (
        // <GalleryItem key={item.fileId} item={item} />
        <GalleryItem key={img.fileId} item={img} />
      ))}
    </div>

  )
}

export default Search

