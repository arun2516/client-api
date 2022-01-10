const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashpassword = (plainpassword) =>{
    return new Promise((resolve)=>{
        resolve(bcrypt.hashSync(plainpassword,saltRounds));
    });
};

const comparepassword = (plainpassword,passfromdb)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(plainpassword,passfromdb,function(err,result){
            if(err) reject(err);
            resolve(result) ;
        });
    });
};

module.exports = {
    hashpassword,
    comparepassword,
};