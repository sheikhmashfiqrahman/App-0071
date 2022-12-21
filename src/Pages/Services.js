import axios from "axios";

// services have all the crud operations needed to communicate with the backend 

const baseURL = 'http://localhost:8102';
const baseAPIURL = `/api`;

//Create or Register a new User
const create = (newObject) => {
        return axios.post(baseAPIURL + "/auth/register", newObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}


//Get the user when logging in
const getUser = (newObject) => {
    return axios.post(baseAPIURL+`/auth`, newObject, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}


//Fetch logged in user's profile information GET
const getUserProfile = (token) => {
    console.log("Token", token)
    return axios.get(baseAPIURL+`/userProfile/${token}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}


const updateUserProfile = (token, body) => {
    console.log("Token", token)
    return axios.put(baseAPIURL+`/updateUserProfile/${token}`,body, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}

export default {getUser, create, getUserProfile, updateUserProfile, baseURL  }