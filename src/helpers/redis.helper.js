
const redis = require("redis");
const client = redis.createClient();
//redis://localhost:6379

const setjwt = (key,value)=>{
    return new Promise((resolve,reject)=>{
        try{
            return client.set(key,value,(err,res)=>{
                if(err) reject(err);
                resolve(res);
            });
        }catch(error){
            reject(error);
        }
       

    });
    
};

const getjwt = (key)=>{
    return new Promise((resolve,reject)=>{
        try{
            client.get("key",(err,res)=>{
                if(err) reject(err);
                resolve(res);
            });
        }catch(error){
            reject(error);
        }
       

    });
    
};

module.exports = {
    setjwt,getjwt
}