import React, { useState, useEffect } from 'react';
import './Search.css';
import MovieBox from '../MovieBox/MovieBox';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Search({ user ,data }) {
   const isAvailable = true;

      return (
         <div>
         <h2>Search results</h2>
         <Swiper className="swiper-container"
             spaceBetween={0}
             slidesPerView='auto'
             navigation
         >
             {data.map((movieReq) =>       
                     <SwiperSlide  key={movieReq.id} className="swiper-slide">
                         <MovieBox  user={user} isAvailable={isAvailable} movieItem={movieReq} {...movieReq} />
                     </SwiperSlide> 
             )}
         </Swiper>
     </div>
       
      );
   }

export default Search;
