const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashpassword = plainpassword =>{
    return new Promise(resolve=>{
        resolve(bcrypt.hashSync(plainpassword,saltRounds))
    })
}

module.exports = {hashpassword};