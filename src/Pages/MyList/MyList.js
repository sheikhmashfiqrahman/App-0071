import axios from "axios";
import "./MyList.css";
import React, { useState, useEffect } from 'react';
import MovieBox from "../../Components/MovieBox/MovieBox";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Search from '../../Components/Search/Search';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])


const MyList = ({ user ,data ,urls}) => {
    const [myList, setMyList] = useState([])
    const myListUrl = '/browse/myfavouritelist'
    const isAvailable = true;
    const [refetchFav, setRefetchFav] = useState(false)
    const [isFavList, setIsFavList] = useState(true)


    useEffect(() => {
        fetchFavourite()

    }, [refetchFav])

    //get favourite list
    const fetchFavourite = () => {
        if (user) {
            const config = { headers: { Authorization: "Bearer " + user.token } }
            axios.post(myListUrl, { user }, config)
                .then(res => {
                    setMyList(res.data)
                })
                .catch(err => console.log(err))
        }
    }

    return (

        <div className="favouriteList">
            <p className="user-logged-in">Logged in as {user.username}</p>
            <div>
                {data.length > 0 ?
                    <Search user={user} data={data} />
                    :
                    <div></div>
                }
                <h2>My Favourite List</h2>
                <Swiper className="swiper-container"
                    spaceBetween={0}
                    slidesPerView='auto'
                    navigation
                    scrollbar={{ draggable: true }}

                >
                    {myList.map((movieReq) =>
                        <SwiperSlide key={movieReq.id} className="swiper-slide" >
                            <MovieBox isFavList={isFavList} refetchFav={refetchFav} setRefetchFav={setRefetchFav} liked={true} user={user} isAvailable={isAvailable} movieItem={movieReq} {...movieReq} movieUrls={urls.find(o => o.id === movieReq.id)} />

                        </SwiperSlide>)}
                </Swiper>

            </div>
        </div>
    )

}
export default MyList