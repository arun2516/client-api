const { userschema } = require("./User.schema")

const insertuser = (userobj) =>{

    return new Promise((resolve,reject)=>{
    userschema(userobj)
    .save()
    .then((data)=> resolve(data))
    .catch((error)=> reject(error));

    });
    
};

module.exports={
    insertuser,
};