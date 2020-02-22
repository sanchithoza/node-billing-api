const {client} = require('./../db/db-connect');

var authenticate = (req) => {
 var token = req.headers['x-auth'];
if(token){
return findByToken(token)
.then((user) => {
  if (user.name === req.tokenData.name) {
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


const findByToken = (token) => {
  return client.query("SELECT * FROM users WHERE token = $1", [token])
    .then((result)=>{
      return result.rows[0];
    }).catch((err)=>{
      return err;
    });
}

module.exports = {
authenticate
}