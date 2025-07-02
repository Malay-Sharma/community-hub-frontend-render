import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from "@/components/ui/button"
import { Bookmark } from 'lucide-react'
import { IKImage } from 'imagekitio-react'
import { Link } from 'react-router-dom'

const GalleryItem = ({item}) => {
  return (
<div
  className="flex relative group"
  style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
>

  
      {/* Wrap the whole visual container in a Link using absolute fill */}
      <Link
        to={`/dashboard/search/${item.fileId}`}
        state={{ media: item.url, height: item.height }}
        className="absolute inset-0 z-10"
      />

      {/* The image remains visually visible behind the transparent link */}
      <img
        src={item.url}
        className="w-full h-full rounded-[16px] object-cover brightness-90 transform transition duration-300 group-hover:scale-105 group-hover:brightness-110"
        alt="Gallery item"
      />

    {/* <Link to={`/dashboard/postpage/${item.id}`} state={{ media: item.media, height: item.height }}>    </Link> */}
  <Button
    className="absolute bottom-2 right-2 bg-red-600 bg-opacity-60 text-white px-3 py-1 rounded-full text-sm z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
  >

      <Bookmark/>
  </Button>


</div>



  )
}

export default GalleryItem