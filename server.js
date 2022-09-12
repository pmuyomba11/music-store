//DEPENDENCIES
const express = require('express')
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

// Database Connection
mongoose.connect(process.env.DATABASE_URL)


//MIDDLEWARE $ BODY PARSER
app.use(express.urlencoded({ extended: true }))


//ROUTES
//INDEX

//NEW

//DELETE

//UPDATE

//CREATE

//EDIT

//SHOW

//LISTENERS
// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
})
