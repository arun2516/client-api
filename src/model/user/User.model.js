const { userschema } = require("./User.schema")

const insertuser = (userobj) =>{

    return new Promise((resolve,reject)=>{
    userschema(userobj)
    .save()
    .then((data)=> resolve(data))
    .catch((error)=> reject(error));

    });
    
};

const getuserbyemail = (email)=>{

    return new Promise((resolve,reject)=>{
        if(!email) return false

        try{
            userschema.findOne({email},(error,data)=>{
                if(error){
                    reject(error);
                }
                resolve(data);
            })

        }catch(error){
            reject(error);
        }

    

    })
    
}

module.exports={
    insertuser,
    getuserbyemail,
};