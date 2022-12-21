/**
 * We create our database schema here under the module models.  
 *
 */

 const mongoose = require('mongoose')
 const config = require('../config')
 
 // firstname, lastname, password added to the schema for login and registration
 
 const sessionSchema = new mongoose.Schema({
   username: { type: String, unique: true },
   password: { type: String },
   firstName: { type: String },
   lastName: { type: String },
   //to store liked movies
   favouriteMovies:{type:[Object]},
   dislikedMovies :{type:[Object]},
   watchLater :{type:[Object]},
   recentlyWatched :{type:[Object]}
 },
   {
     toJSON: { virtuals: true },
     toObject: { virtuals: true }
   })
 
 sessionSchema.set('toJSON', {
   transform: (document, returnedObject) => {
     returnedObject.id = document._id.toString()
     delete returnedObject._id
     delete returnedObject.__v
   }
 })
 
 const Session = mongoose.model('Session', sessionSchema)


 const initDB = async () => {
  await mongoose
    .connect(config.mongoDBUrl)
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message)
    })
}



 module.exports = { Session,  initDB }