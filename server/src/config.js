const dotenv = require('dotenv')

if (process.env.NODE_ENV != 'production') {
    dotenv.config();
}

const corsClientDomain = "http://localhost:3000"

const mongoDBUrl = "mongodb+srv://Sheikh:hello@cluster0.ov8d2g4.mongodb.net/?retryWrites=true&w=majority";

const sessionSecret = "reallysecretsecret" || "notVerySecretSecret"

const port = process.env.PORT || '8000'

module.exports = { corsClientDomain, sessionSecret, port, mongoDBUrl }