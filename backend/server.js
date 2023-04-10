require('dotenv').config() //picks data from a hidden file .env

const express = require('express') //the app
const mongoose = require('mongoose') //the database 
//routes
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const communityRoutes = require('./routes/community')

//The variable for the .env environment
const URI = process.env.MONGO_URI
const port = process.env.PORT


//express app
const app = express()

//Global Middleware uses json
app.use(express.json())


//CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });
  
//logs the route called
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/user', userRoutes)
app.use('/post', postRoutes)
app.use('/community', communityRoutes)



mongoose.set('strictQuery', true)//this was from the most recent update
//connect to database
mongoose.connect(URI)
    .then(() => {
        //listen
        app.listen(port, () => {
            console.log("Connected to the database Listening on port:", port)
        })
    })
    .catch((error) => {
            console.log("Error on the database:"+ error)
    })