const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
    email:{
        type: String,
    },
    password:{
        type:String,
    },
    repeatPassword:{
        type:String,
    },
    name:{
        type:String,
    },
    phone:{
        type:String,
    },


},{collection:'users'});

module.exports=  mongoose.model('User',User);





