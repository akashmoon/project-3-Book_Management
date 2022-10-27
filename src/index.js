const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const multer= require("multer");
// const { AppConfig } = require('aws-sdk');

const route = require("./routes/route")

const app = express();
app.use( multer().any())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


mongoose.connect("mongodb+srv://akashmoon:akash_moon@cluster0.xvaineh.mongodb.net/project3-Book_Management?retryWrites=true&w=majority", 
     { useNewUrlParser: true })
     .then(() => console.log("MongoDb is connected"))
     .catch(error => console.log(error))

app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
     console.log('Express app running on port' + (process.env.PORT || 3000))
});
