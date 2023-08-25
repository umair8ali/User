const express = require('express');     //For using express
const app = express();
const studentRoute = require('./api/routes/student');
const facultyRoute = require('./api/routes/faculty');
const userRoute = require('./api/routes/user');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const cors = require('cors');

mongoose.connect('mongodb+srv://umair8nagori:nagori@sbf.3hgeok0.mongodb.net/?retryWrites=true&w=majority');//For connection

mongoose.connection.on('error', err=>{              //Checking Mongoose connection if it's not connected by using error function
    console.log("Connection Error Failed..")
})   

mongoose.connection.on('connected', ()=>{              //Checking Mongoose connection if it's not connected by using error function
    console.log("Connected with DataBase Successfullyy!!")
}) 

// app.use(cors());
// app.use(morgan('dev'));
//Body Parser => Recieve and Store
app.use(bodyParser.urlencoded({extended:false}));     //Send value along with URL
app.use(bodyParser.json());         //Data sent in the form of JSON.

app.use('/student', studentRoute);
app.use('/faculty', facultyRoute);
app.use('/user', userRoute);

app.use((req,res,next) =>{          //Middleware
    res.status(400).json({
        eroor: "ERROR 404 not found!"
    })
})

module.exports = app;