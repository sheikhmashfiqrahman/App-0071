import React, { useState, useEffect } from 'react';
import MovieBox from '../MovieBox/MovieBox';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])


const Row = ({ user, title, isAvailable ,urls}) => {
    let baseUrl = "/home"
    const myListUrl = '/browse/myfavouritelist'

    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [dislikedList, setDislikedList] = useState([])
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)
  

    useEffect(() => {
        switch (title) {
            case "Recently Watched":
               baseUrl = '/home/recentlywatched'
                fetchRecentlyWatched(baseUrl)
                break;
            case "Classic":
                baseUrl = '/home/classic'
                break;

            case "More":
                baseUrl = '/home/classic'
                break;
            default:
                baseUrl = '/home/classic'
        }

        //only fetch classic and more
        if (title != "Recently Watched") {
            fetchMovies(baseUrl)
        }
        //fetch favourites and dislikes 
        fetchFavourite()
        fetchDislikes()

    }, [])
 
  
  
    const fetchRecentlyWatched = async (url) => {
        if (user) {
            const config = { headers: { Authorization: "Bearer " + user.token } }
            await axios.post(url, { user }, config)
                .then(res => {
                    setMovies(res.data)
                })
                .catch(err => console.log(err))
        }
    }
    const fetchMovies = (url) => {
        axios.get(url)
            .then(res => {         
                //pick 20 items randomly
                setMovies(getMultipleRandom(res.data, 20))             
            })

            .catch(err => console.log(err))
    }

    const fetchFavourite = () => {
        const config = { headers: { Authorization: "Bearer " + user.token } }
        axios.post(myListUrl, { user }, config)
            .then(res => {
                setFavourites(res.data)
            })
    }

    const fetchDislikes = () => {
        const dislikesUrl = '/browse/dislikes'
        const config = { headers: { Authorization: "Bearer " + user.token } }
        axios.post(dislikesUrl, { user }, config)
            .then(res => {
                setDislikedList(res.data)
            })
    }
    // get random items from an array
    function getMultipleRandom(arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }
  

    return (
        <div className="a-row">
            <h2>{title}</h2>
            <Swiper className="swiper-container"
                spaceBetween={0}
                slidesPerView='auto'
                navigation
            >
                {movies.map((movieReq) =>
                    /* check if the movie item is in the favourtie list */
                    favourites.some(el => el.id === movieReq.id) ?
                        //case 1: liked = true , disliked = false
                        <SwiperSlide key={movieReq.id} className="swiper-slide">
                            <MovieBox liked={!liked} disliked={disliked} user={user} isAvailable={isAvailable} movieItem={movieReq} {...movieReq} movieUrls={urls.find(o => o.id === movieReq.id)}/>
                        </SwiperSlide>
                        :
                        /* check if the movie item is in the dislikedList  */
                        dislikedList.some(el => el.id === movieReq.id) ?
                            //case 2: liked = false , disliked = true
                            <SwiperSlide key={movieReq.id} className="swiper-slide">
                                <MovieBox liked={liked} disliked={!disliked} user={user} isAvailable={isAvailable} movieItem={movieReq} {...movieReq}  movieUrls={urls.find(o => o.id === movieReq.id)}/>
                            </SwiperSlide>
                            :
                            //case 3: liked = false , disliked = false
                            <SwiperSlide key={movieReq.id} className="swiper-slide">
                                <MovieBox liked={liked} disliked={disliked} user={user} isAvailable={isAvailable} movieItem={movieReq} {...movieReq}  movieUrls={urls.find(o => o.id === movieReq.id)} />
                            </SwiperSlide>
                )}

            </Swiper>


        </div>
    )
}

export default Row