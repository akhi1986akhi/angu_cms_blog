const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        index:{
            unique:true,
        },
        match:/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

var userModel = mongoose.model('UserCms',userSchema);
module.exports=userModel;