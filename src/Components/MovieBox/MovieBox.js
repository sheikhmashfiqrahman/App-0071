import React, { useState, useEffect } from 'react';
import "./MovieBox.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import defaultimageURL from './image-not-found.png';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const MovieBox = ({ movieItem, isFavList, refetchFav, setRefetchFav, isWatchList, refetch, setRefetch, user, id, liked, disliked, posterURL, title, isAvailable,movieUrls }) => {

    const navigate = useNavigate();

    const [isHovered, setHover] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [like, setLike] = useState(liked);

    const [dislike, setDislike] = useState(disliked);

    //for loading the default picture when we first open the page
    function onLoad() {
        setTimeout(() => setIsLoading(false), 1000);
    }

    // go to watch page
    const handleMovieClick = async() => {
        //add the movie to recently watch
        addToRecentlyWatched()
        navigate(`/watch`,{state:{movieUrls:movieUrls}});     
    }

    //add the movie to the favourite list
    const updateLike = async (url) => {
        const config = { headers: { Authorization: "Bearer " + user.token } }

        try {
            await axios.put(url, { movieItem }, config)
                .then(response => response.data)

        } catch (error) {
            console.log("error is", error)
        }
    }


    const removeLike = async () => {
        const url = `/unlike/` + id
        //remove it from the list
        await updateLike(url)
         //re-render. so we can see the changes immediately when toggle like/dislike
        if (isFavList) {
            setRefetchFav(!refetchFav)
        }
    }
    //handle like
    //when users click on the like button, use update like function to add the movies to the list
    const addLike = () => {
        if (dislike) {
            setDislike(false)
        }
        const url = `/like/` + id
        updateLike(url)
    }
    //remove movies from the list
    const removeDislike = () => {    
        const url = `/undislike/` + id     
        updateLike(url)
    }

    //handle dislike
    const addDislike = async () => {      
        if (like) {
            setLike(false)
        }
        const url = `/dislike/` + id
     
        await updateLike(url)
        //re-render. so we can see the changes immediately when toggle like/dislike
        if (isFavList) {
            setRefetchFav(!refetchFav)
        }
    }
    
    //toggle the like/dislike (front end)
    const toggleLike = (event) => {
        like ? removeLike() : addLike();
        setLike(!like);
    }

    const toggleDislike = () => {   
        dislike ? removeDislike() : addDislike();
        setDislike(!dislike);
    }

    //add movies a watch list
    const addToWatchList = () => {    
        const url = `/add/` + id
        updateLike(url)
    }

    //remomve movies from the watch list
    const removeFromWatchList = async () => {
        const url = `/remove/` + id

        await updateLike(url)
        //refetch so we can see the changes immediately without refreshing the page
        setRefetch(!refetch)
    }

    //send the movie id to back end and add the movie to recently watched list 
    const addToRecentlyWatched= () => {     
        const url = `/recentlywatched/` + id
        updateLike(url)

    }
    // if it is a watch page , display a minus sign instead of the plus sign
    if (isWatchList) {
        return (
            <div>
                <div className="movieBox"
                    onMouseOver={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}>
                    <img
                        className="row_poster"
                        alt="ad-img"
                        src={defaultimageURL}
                        style={{ display: isLoading ? "block" : "none" }}></img>

                    <img
                        className="row_poster"
                        alt="ad-img"
                        src={posterURL}
                        style={{ display: isLoading ? "none" : "block" }}
                        onLoad={onLoad}>

                    </img>
                    <h6 className='movieName'>{title}</h6>
                </div>

                <div >

                    {like ? (
                        <FavoriteBorderIcon className='like' onClick={() => { toggleLike() }} />
                    ) : (
                        <FavoriteBorderIcon className='not-like-yet' onClick={() => { toggleLike() }} />
                    )}

                    {dislike ? (
                        <ThumbDownAltRoundedIcon className='disliked' onClick={() => { toggleDislike() }} />
                    ) : (
                        <ThumbDownAltOutlinedIcon className='dislike2' onClick={() => { toggleDislike() }} />
                    )}

                </div>
                <RemoveCircleOutlineIcon className='add' onClick={() => { removeFromWatchList() }} />
                <PlayCircleOutlineIcon fontSize="large" className='play' onClick={() => handleMovieClick() } />

            </div>

        )
        // is not a watch page , use the plus sign
    } else {
        return (
            <div>
                <div className="movieBox"
                    onMouseOver={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}>
                    <img
                        className="row_poster"
                        alt="ad-img"
                        src={defaultimageURL}
                        style={{ display: isLoading ? "block" : "none" }}></img>

                    <img
                        className="row_poster"
                        alt="ad-img"
                        src={posterURL}
                        style={{ display: isLoading ? "none" : "block" }}
                        onLoad={onLoad}>

                    </img>
                    <h6 className='movieName'>{title}</h6>
                </div>
                <div>
                    {like ? (
                        <FavoriteBorderIcon className='like' onClick={(e) => { toggleLike(e) }} />
                    ) : (
                        <FavoriteBorderIcon className='not-like-yet' onClick={(e) => { toggleLike(e) }} />
                    )}

                    {dislike ? (
                        <ThumbDownAltRoundedIcon className='disliked' onClick={() => { toggleDislike() }} />
                    ) : (
                        <ThumbDownAltOutlinedIcon className='dislike2' onClick={() => { toggleDislike() }} />
                    )}
                  
                </div>
            

                <AddCircleOutlineIcon className='add' onClick={() => { addToWatchList() }} />
                <PlayCircleOutlineIcon fontSize="large" className='play' onClick={() => handleMovieClick() } />
            </div>

        )
    }

}

export default MovieBox;

