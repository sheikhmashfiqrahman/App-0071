import axios from "axios";
import "./WatchList.css";
import React, { useState, useEffect } from 'react';
import MovieBox from "../../Components/MovieBox/MovieBox";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Search from '../../Components/Search/Search';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])


const WatchList = ({ user ,data ,urls}) => {
    const [myList, setMyList] = useState([])
    const [isWatchList, setWatchList] = useState(true);
   const watchListUrl = '/browse/mywatchlist'
    const isAvailable = true;
    const [refetch, setRefetch] = useState(false); 


    useEffect(() => {
        fetchWatchList()
    }, [refetch])

    //fetch watch list 
    const fetchWatchList = () => {
        if (user) {
            const config = { headers: { Authorization: "Bearer " + user.token } }
            axios.post(watchListUrl, { user }, config)
                .then(res => {                 
                    setMyList(res.data)
                })
                .catch(err => console.log(err))
        }
    }

    return (

        <div className="WatchList">
         
            <div>
                {data.length > 0 ?
                    <Search user={user} data={data} />
                    :
                    <div></div>
                }
                <h2>Watch List</h2>
                <Swiper className="swiper-container"
                    spaceBetween={0}
                    slidesPerView='auto'
                    navigation
                    scrollbar={{ draggable: true }}
                >

                    {myList.map((movieReq) =>
                        <SwiperSlide className="swiper-slide" key={movieReq.id}>
                            <MovieBox refetch={refetch} setRefetch={setRefetch} isWatchList={isWatchList} liked={true} user={user} isAvailable={isAvailable} movieItem={movieReq} {...movieReq} movieUrls={urls.find(o => o.id === movieReq.id)} />
                        </SwiperSlide>)}
                </Swiper>

            </div>
        </div>
    )

}
export default WatchList