import React from 'react';
import {  useNavigate } from 'react-router-dom';
import './Home.css';
import Row from '../Components/Row/Row';

import Search from '../Components/Search/Search';


function Home({ user, setUser ,data, urls}) {
 
   const navigate= useNavigate()

   const logoutHandler = (event) => {
      event.preventDefault();
      console.log("clear token")
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      console.log("clear token")
       navigate("/login")
  }

   if(!user){
      return(
         <div>No user</div>
      )
   }else{
      return (
         <div className='home'>

            {data.length > 0 ?    
                  <Search user={user} data={data}/>
               :
               <div></div>               
            }           
            <div>
                  <Row title="Recently Watched" user={user} urls={urls}/>
                  <Row title="Classic" user={user} urls={urls}/>
                  <Row title="More" user={user} urls={urls}/>
            </div>
   
         </div>
   
      );

   }

}

export default Home;
