import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Services from './Services';
import "./UserProfile.css";

// Component for the user profile

const UserProfile = () => {

    const [userProfile, setUserProfile] = useState([]);
    const userToken = localStorage.getItem("token");

    //useRef is used for persisting values from the input 
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    
    useEffect(() => {
        
        console.log(userToken);
        Services.getUserProfile(userToken)
            .then(object => {
               
                setUserProfile(object)
            })
    }, [])

    console.log("This is user", userProfile);

    const formHandler = (event) => {
        event.preventDefault()
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        console.log(firstName, lastName, username, password);

        const body = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        }
        console.log(body);
        Services.updateUserProfile(userToken, body)
            .then(object => {
                console.log("profile object", object)
                alert("userprofile updated")

            })

    }

    const userProfileView = (userProfile[0] !== undefined) ? <form onSubmit={formHandler}>
        <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg" alt="Admin" className="rounded-circle" width={150} />
                    <div className="mt-3">
                      <h4>{userProfile[0].firstName} {" "} { userProfile[0].lastName}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">First Name</h6>
                    </div>
                    <input className="col-sm-9 text-secondary" defaultValue={userProfile[0].firstName} ref={firstNameRef}/>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Last Name</h6>
                    </div>
                    <input className="col-sm-9 text-secondary" defaultValue={userProfile[0].lastName} ref={lastNameRef}/>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Username</h6>
                    </div>
                    <input className="col-sm-9 text-secondary" defaultValue={userProfile[0].username} ref={usernameRef} disabled/>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Password</h6>
                    </div>
                    <input className="col-sm-9 text-secondary" defaultValue={userProfile[0].password} ref={passwordRef}/>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <button type="submit" className="btn btn-info " >Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form> : <div>
        <h2>No Profile available</h2>
    </div>

    

    return (
        <div>
            {userProfileView}
        </div>
    )

}
export default UserProfile;