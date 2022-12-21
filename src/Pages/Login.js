// all the imports 

import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Services from './Services';
import './Login.css';

/**
 * 
 * This is the login page for our user to login to the streaming platform,
 * If login is successful, the users will be navigated to the home page of the platform.
 * The page focuses on our login applications. 
 * @returns renders the login page with a formhandler
 * 
 */
const Login = ({user,setUser}) => {

    // useNavigate hook is used for switching the pages from login to Home page. 
    const navigate = useNavigate();

    /**
     * username and passwords are stored as a mutable value which
     * does not require any re-render when the page is updated
     * 
     *  */ 

    const userNameRef = useRef();  
    const passwordRef = useRef();


    /**
     * @param {*} event 
     * loginHandler method is used to handle the form of our login and this is passed as 
     * function for on submit.
     * 
     */
    const loginHandler = (event) => {
        event.preventDefault();
        // login body holding the username and password, for checking with the back-end using get method later.
    
        const body = {
            username: userNameRef.current.value,
            password: passwordRef.current.value,
        }

 
        // Services are in a separate module. 
        // Check if we have the current user (body) in the DB 
        // If user exists the login will be successful
        // Used local storage token for authentication
        
        Services.getUser(body)
            .then(object => {

                console.log("post", object);
                console.log("status", object.status)

                if (object.status === 'success') {
                    setUser(object)
                    localStorage.setItem("username", object.username)
                    localStorage.setItem("token", object.token)
                  
                    navigate('/homepage')
                }

                else{

                    alert('Login Unsuccessfull. Wrong Username/Password Combination. ')
                }
            })
    }
   
// rendering the login page 

    return (
        <div className="Login pre-login-background">
            <img className="pre-login-logo"></img>

                        <form onSubmit={loginHandler} className="pre-login-form login100-form validate-form p-b-33 p-t-5">
                            <span className="pre-login-form-title">Login</span>
                            <div
                                className="pre-login-form-input-wrapper"
                            >
                                <input
                                    className="pre-login-form-input"
                                    id="username"
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    ref={userNameRef}
                                    required
                                />
                                <span className="focus-input100" data-placeholder="" />
                            </div>
                            <div
                                className="pre-login-form-input-wrapper"
                            >
                                <input
                                    className="pre-login-form-input"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    ref={passwordRef}
                                    required
                                />
                                <span className="focus-input100" data-placeholder="" />
                            </div>
                            <div className="container-login100-form-btn m-t-32">
                                <button type="submit" className="pre-login-form-button">Login</button>
                            </div>
                                <Link className="pre-login-form-secondary-cta" to="/" >Register</Link>
             
                        </form>

                    </div>
            
    )

}


export default Login;