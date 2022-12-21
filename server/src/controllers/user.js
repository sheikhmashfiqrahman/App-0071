
const models = require('../models')
const auth = require('./auth')

//update like, add a movie to the favourite list

const like = async (req, res) => {
   const user = await auth.validUser(req)
   if (user) {
      try {
         //remove from the favourite list
         await models.Session.find({ user })
            .update({ $pull: { dislikedMovies: req.body.movieItem } });


         //only add if it doesn't exist
         await models.Session.find({ user })
            .update({ $addToSet: { favouriteMovies: req.body.movieItem } });

         const session = await models.Session.find({ _id: user })


         res.status(200).json("liked")
      } catch (err) {
         console.log(err)
      }
   }
}

//remove a movie from favourite list

const dislike = async (req, res) => {
   const user = await auth.validUser(req)
   if (user) {

      try {
         const liked = await models.Session.find({ _id: user })

         //remove from the favourite list
         await models.Session.find({ user })
            .update({ $pull: { favouriteMovies: req.body.movieItem } });

         // add
         await models.Session.find({ user })
            .update({ $addToSet: { dislikedMovies: req.body.movieItem } });


         const session = await models.Session.find({ _id: user })
         res.status(200).json("disliked")
      } catch (err) {
         console.log(err)
      }
   }

}
//handle unlike request
const unlike = async (req, res) => {
   const user = await auth.validUser(req)
   if (user) {
      try {
         const liked = await models.Session.find({ _id: user })
         console.log("Liked is ", liked)

         //remove from the favourite list
         await models.Session.find({ user })
            .update({ $pull: { favouriteMovies: req.body.movieItem } });

         res.status(200).json("unliked")
      } catch (err) {
         console.log(err)
      }
   }

}
//when an user undislikes a movie, remove the movie from the dislike list
const undislike = async (req, res) => {
   const user = await auth.validUser(req)
   if (user) {

      try {
         const liked = await models.Session.find({ _id: user })
         console.log("Liked is ", liked)

         //remove from the favourite list
         await models.Session.find({ user })
            .update({ $pull: { dislikedMovies: req.body.movieItem } });
       
         res.status(200).json("undisliked")
      } catch (err) {
         console.log(err)
      }
   }

}
//add a movie to the watch list
const watchLater = async (req, res) => {
   const user = await auth.validUser(req)

   if (user) {

      try {
         const liked = await models.Session.find({ _id: user })
         //only add if it doesn't exist
         await models.Session.find({ user })
            .update({ $addToSet: { watchLater: req.body.movieItem } });

         res.status(200).json("added")
      } catch (err) {
         console.log(err)
      }
   }
}
//remove a movie from the watch list
const remove = async (req, res) => {
   const user = await auth.validUser(req)
   if (user) {
      try {
         await models.Session.find({ user })
            .update({ $pull: { watchLater: req.body.movieItem } });
         res.status(200).json("unliked")
      } catch (err) {
         console.log(err)
      }
   }
}
// add a movie to recent watched list
const recentlyWatched = async (req, res) => {
   const user = await auth.validUser(req)
   if (user) {
      try {
         //only add if it doesn't exist
         await models.Session.find({ user })
            .update({ $addToSet: { recentlyWatched: req.body.movieItem } });

         res.status(200).json("added")
      } catch (err) {
         console.log(err)
      }
   }

}

module.exports = { like, dislike, unlike, undislike, watchLater, remove, recentlyWatched }