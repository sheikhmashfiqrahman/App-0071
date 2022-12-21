

const { keys } = require('@mui/system')
const models = require('../models')
const auth = require('./auth')
const fetch = require('cross-fetch');


const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=0031f9c452afd08d1a7b7a8dd7f0a3c6"
const API_CLASSIC = "https://api.sampleapis.com/movies/classic"

const fs = require("fs") 
const rawData = fs.readFileSync("server/movies.json")
const data = JSON.parse(rawData)



//fetch movies 
const getMovies = async (request, response) => {
    try {
        fetch(API_URL)
            .then((res) => res.json())
            .then(data => {
                response.json(data.results)

            })
    } catch (error) {
        console.log(error)
    }
}
// search 
const searchMovies = async (req, res) => {

    const query = req.query.q
    const keys = ["title"]
    const search = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(query))
        )
    }
    fetch(API_CLASSIC)
        .then((res) => res.json())
        .then(data => {
            res.json(search(data))
        })

}
// get classic movies
const getClassic = async (request, response) => {
    try {
        fetch(API_CLASSIC)
            .then((res) => res.json())
            .then(data => {
                response.json(data)

            })
    } catch (error) {
        console.log(error)
    }
}

//get movies from a recently watched list
const getRecentlyWached = async (request, response) => {
    const user = await auth.validUser(request)
    if (user) {
        const session = await models.Session.find({ _id: user })

        response.json(session[0].recentlyWatched)
    } else {
        console.log("user not found")
    }
}

//get movies from a favourite list
const getMyFavouriteList = async (request, response) => {

    const user = await auth.validUser(request)

    if (user) {
        const session = await models.Session.find({ _id: user })
        response.json(session[0].favouriteMovies)

    }

}
//get movies from a watch list
const getWatchList = async (request, response) => {

    const user = await auth.validUser(request)

    if (user) {
        const session = await models.Session.find({ _id: user })
        response.json(session[0].watchLater)

    }

}
//get movies from a dislike list
const getDislikes = async (request, response) => {

    const user = await auth.validUser(request)

    if (user) {
        const session = await models.Session.find({ _id: user })
        response.json(session[0].dislikedMovies)

    }

}

//get movie urls for watch component
const getURL = async (req, response) => {

    await response.json(data.movies);

}

module.exports = { getMovies, getRecentlyWached, getClassic, getMyFavouriteList, getDislikes, getWatchList, searchMovies ,getURL }
