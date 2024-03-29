
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

client.on("error", function(error){
    console.error(error);
});

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
            client.get(key,(err,res)=>{
                if(err) reject(err);
                resolve(res);
            });
        }catch(error){
            reject(error);
        }
       

    });
    
};

const deletejwt = (key)=>{
    try{
        client.del(key);
    }catch(error){
        console.log(error)
    }
};

module.exports = {
    setjwt,
    getjwt,
    deletejwt,
}