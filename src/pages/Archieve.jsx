// src/pages/ImageGallery.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Archieve = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/images`, {
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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Image Gallery</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img) => (

          
<Link
  to={`/dashboard/archieve/post/${img.fileId}`} 
  key={img.fileId}
  state={{ image: img, post: img.post }} 
  className="group block transition duration-300 ease-in-out transform hover:scale-[1.02]"
>
  <div className="aspect-[6/8] overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white group-hover:shadow-xl transition-shadow duration-300">
    <img
      src={img.url}
      alt={img.name}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
    />
  </div>
</Link>


        
        ))}
      </div>
    </div>
  );
};

export default Archieve;