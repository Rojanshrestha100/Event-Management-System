const express = require('express')    //framework of nodejs(httprequest, routing, middleware hadle)
const mongoose = require('mongoose')  //mongodb object modeling tool(schema based solution)
const path = require('path')          
require('dotenv').config()            //manage environment variables(store sensitive info)
const multer = require('multer')      //handles multipart/form-data(commonly used for file uploads)
const cors = require('cors')          //joins front end and backend(cross origin resource sharing)
const bodyParser = require('body-parser')
const app = express()
const PORT = 8000
const routes = require('./Routes')

//mongodb connection
require("./DB/conn")


//middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({entends: true}))
app.use(express.json())
app.use(routes)


app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error.message || 'There seems to be some problem.',
    })
})


app.listen(PORT, () => {
    console.log(`Server is starting at port number ${PORT}`);
});