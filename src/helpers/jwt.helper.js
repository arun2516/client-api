var jwt = require('jsonwebtoken');
const { storeuserrefreshjwt } = require('../model/user/User.model');
const {setjwt, getjwt} = require("./redis.helper")

const createaccessjwt = async(email, _id)=>{
    try{
        const accessjwt = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET,{expiresIn:'15m',});

        await setjwt(accessjwt, _id);
    
        return Promise.resolve(accessjwt);

    }catch(error){
        return Promise.reject(error);
    }

};


const createrefreshjwt =async(email, _id)=>{
    try{
        const refreshjwt = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET,{expiresIn:'30d',});

         await storeuserrefreshjwt(_id, refreshjwt);
        return Promise.resolve(refreshjwt);
    }catch(error){
        return Promise.reject(error);
    }
};

module.exports= {
    createaccessjwt,
    createrefreshjwt,
};