const express = require("express");
const router = express.Router();
const {insertuser,getuserbyemail} = require("../model/user/User.model")
const {hashpassword,comparepassword} = require("../helpers/bcrypt.helper");
const { json } = require("body-parser");
const { createaccessjwt, createrefreshjwt } = require("../helpers/jwt.helper");

router.all("/",(req,res,next)=>{
    // res.json({message:"return from user router"});
    next();
})


// create new user router
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
   
});

// user sign in router
router.post("/login",async(req,res)=>{

    const{email,password} = req.body;

    if(!email || !password){
       return res.json({status:"error", message:"invalid form submission"})
    }

    const user = await getuserbyemail(email);

    const passfromdb = user && user._id?user.password:null;
    
    if(!passfromdb)  return res.json({status:"error",message:"invalid email or password!"});

 

    const result = await comparepassword(password,passfromdb);

    if(!result){
       return res.json({status:"error",message:"invalid email or password!"});
    }

    const accessjwt = await createaccessjwt(user.email,`${user._id}`);
    const refreshjwt = await createrefreshjwt(user.email,`${user._id}`);


    res.json({
        status:"success",
         message:"login successfully",
        accessjwt,
        refreshjwt
        });
});

module.exports = router;