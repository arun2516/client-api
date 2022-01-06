const express = require("express");
const router = express.Router();
const {insertuser} = require("../model/user/User.model")
const {hashpassword} = require("../helpers/bcrypt.helper")

router.all("/",(req,res,next)=>{
    // res.json({message:"return from user router"});
    next();
})

router.post("/", async(req,res)=>{

   const{name,company,address,phone,email,password} = req.body

    try{
        // hash password
        const hashedpass = await hashpassword(password)
        const newuserobj = {
            name,
            company,
            address,
            phone,
            email,
            password:hashedpass,
        }
        const result =  await insertuser(newuserobj);
        console.log(result);
        res.json({message:"new user created", result})

    }catch(error){
        console.log(error);
        res.json({status:"error",message:error.message})
    }
   
})
module.exports = router;