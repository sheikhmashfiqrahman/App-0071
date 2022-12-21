
import "./Watch.css";
import React from 'react';
import { useLocation } from 'react-router-dom';


function Watch({ user}) {
    const state = useLocation();
    const { movieUrls } = state; 

        return (

            <div className="Watch">
               
                <video controls muted className="video">
                <source src={state.state.movieUrls.url}></source>
                </video>
            </div>
        )      

}
export default Watch

