const mongoose = require('mongoose');

//Creating User Schema
const userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    password:String,
    phone:Number,
    email:String,
    userType:String
})

module.exports = mongoose.model('User', userSchema);