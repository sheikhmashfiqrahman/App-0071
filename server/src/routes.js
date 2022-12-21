// custom routes have been created, the routes given before were not used

const express = require('express')
const auth = require('./controllers/auth')
const movies= require('./controllers/movies')
const users= require('./controllers/user')
const watch= require('./controllers/watch')
const router = express.Router()
const path = require('path');



//for testing the routes
router.get('/hello', (request, response) => {
  response.send('hello world') ;
})

//route for videos
router.get('/assets/:assetName', watch.streamMovie)


//route for registering the users
router.post('/api/auth/register', auth.createSession)

//route for logging in 
router.post('/api/auth/', auth.getUser)

// route for updating profile

router.get('/api/userProfile/:id', auth.fetchUserProfile);

router.put('/api/updateUserProfile/:id', auth.updateUserProfile);


/// add the routes for your features as you please below
//route for the homepage
router.get('/home',  movies.getMovies);

//route for fetching classic movies
router.get('/home/classic',  movies.getClassic);

//route for fetching recently watched
router.post('/home/recentlywatched', movies.getRecentlyWached)

//route for fetching a favourite list
router.post('/browse/myfavouritelist',movies.getMyFavouriteList)

//route for fetching  a dislike list
router.post('/browse/dislikes',movies.getDislikes)


//route for fetching a watch list
router.post('/browse/mywatchlist',movies.getWatchList)



//route for like
router.put("/like/:id", users.like)

//route for adding movies to a dislike list
router.put("/dislike/:id", users.dislike)

//route for removing movies to a favourite list
router.put("/unlike/:id", users.unlike)

//route for remove a movie item from a dislike list
router.put("/undislike/:id", users.undislike)

//route for adding movies to watch list
router.put("/add/:id", users.watchLater)

//route for removing a movie from a watch list 
router.put("/remove/:id", users.remove)

//route for search
router.get("/search/",movies.searchMovies)

//route for adding movies to recently watch
router.put("/recentlywatched/:id", users.recentlyWatched)

//route for getting movie urls
router.get("/api/urls", movies.getURL)

module.exports = router;