const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({
    name:{type:String,maxlength:50,required:true},
    company:{type:String,maxlength:50,required:true},
    address:{type:String,maxlength:100},
    phone:{type:Number,maxlength:11,required:true},
    email:{type:String,maxlength:50,required:true},
    password:{type:String,minlength:8,maxlength:100,required:true},
    refreshjwt:{
        token:{
            type:String,
            maxlength:500,
            default:""
        },
        addedat:{
            type:Date,
            required:true,
            default:Date.now(),
        }
    }
})

module.exports ={
    userschema: mongoose.model("user",userschema),
};