import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

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

const NormalSlider = () => {
  return (
    <section className="w-full px-4 py-4">

        <div className="w-full max-w-full overflow-x-auto">
            <Swiper
            slidesPerView={2}
            spaceBetween={16}
            freeMode={true}
            modules={[FreeMode]}
            className="w-full "
            breakpoints={{
            640: { slidesPerView: 3 },   // sm
            768: { slidesPerView: 4 },   // md
            1024: { slidesPerView: 5 },  // lg
            1280: { slidesPerView: 6 },  // xl
            1536: { slidesPerView: 6 },  // 2xl
            }}
        >
            {items.map((item) => (
            <SwiperSlide key={item.id} className="!w-auto">
                <div className=" rounded shadow p-0 h-[240px] flex items-center justify-center bg-green-700">
                <img src={item.media} alt={`Item ${item.id}`} className="w-[160px] h-full object-cover rounded" />
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
        </div>

        

      

    </section>
  );
};

export default NormalSlider


    //   <Swiper
    //     slidesPerView={2}
    //     spaceBetween={16}
    //     freeMode={true}
    //     modules={[FreeMode]}
    //     className="!w-full"
    //     breakpoints={{
    //       640: { slidesPerView: 3 },   // sm
    //       768: { slidesPerView: 4 },   // md
    //       1024: { slidesPerView: 5 },  // lg
    //       1280: { slidesPerView: 6 },  // xl
    //       1536: { slidesPerView: 6 },  // 2xl
    //     }}
    //   >

    //     {/* Your Story */}
    //     <SwiperSlide>
    //       <div className="flex flex-col items-center">
    //         <div className="relative w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-blue-500 flex items-center justify-center">
    //           <span className="text-blue-500 text-3xl font-bold">+</span>
    //         </div>
    //         <p className="mt-1 text-xs text-center text-gray-600">Your Story</p>
    //       </div>
    //     </SwiperSlide>

    //     {/* Other stories */}
    //     {items.map((item) => (
    //       <SwiperSlide key={item.id}>
    //         <div className="flex flex-col items-center">
    //           <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink-500">
    //             <img
    //               src={item.media}
    //               alt={`Item ${item.id}`}
    //               className="w-full h-full object-cover"
    //             />
    //           </div>
    //           <p className="mt-1 text-xs text-center text-gray-600">User {item.id}</p>
    //         </div>
    //       </SwiperSlide>
    //     ))}

    //   </Swiper>