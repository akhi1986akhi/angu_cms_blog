const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./models/user');
const cors = require('cors');

const port = 3000;

// DATABASE CONNECTION
require('./db');

app.use(cors({
    // origin: ['https://www.section.io','https://www.google.com/']
    origin:'*'
}));

app.use(express.urlencoded({ extended: false }))

const users = require('./route/user');

app.use('/user',users);


app.get('/',(req,res)=>{
    res.send("OK");
})
app.listen(port,(req, res)=>{
    console.log("Server is running on port:3000");
})