const {client} = require('./../db/db-connect');
const User = require('./../models/users');
var authenticate = (req) => {
  var token = req.headers['x-auth'];
  if(token){
    return User.findUserByToken(token)
    .then((user) => {
     if (user[0].dataValues.userName === req.tokenData.name) {
        return true;
      }else{
        return false;
      }
    }).catch((e) => {
      return false;
    });
  }else{
    return new Promise((resolve,reject)=>{
      resolve(false);
    }).catch((err)=>reject("err",err));//Promise  
  }
};

module.exports = {
  authenticate
}