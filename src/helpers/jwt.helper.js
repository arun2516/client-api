var jwt = require('jsonwebtoken');
const {setjwt,getjwt} = require("./redis.helper")

const createaccessjwt = async(email,_id)=>{
    try{
        const accessjwt = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET,{expiresIn:'15m'});

        await setjwt(accessjwt,_id);
    
        return Promise.resolve(accessjwt);

    }catch(error){
        return Promise.reject(error);

    }

};


const createrefreshjwt = (payload)=>{

    var refreshjwt = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET,{expiresIn:'30d'});

    return Promise.resolve(refreshjwt)

}

module.exports={
    createaccessjwt,
    createrefreshjwt,
}