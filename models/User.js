const mongoose=require('mongoose');
const userschema=new mongoose.Schema({
name:{
    type:String,
    required:true,
    min:6,
    max:255
},
email:{
    type:String,
    required:true,
    min:6,
    max:255
},
password:{
    type:String,
    required:true,
    min:6,
    max:1024
},
Date:{
    type:Date,
    default:Date.now
},
});
module.exports=mongoose.model('User',userschema);