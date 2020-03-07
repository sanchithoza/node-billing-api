
const { readByToken } = require('./../db/user');
var authenticate = (req) => {
  var token = req.headers['x-auth']
  if (token) {
    //verifying user token from db and request header
    return readByToken('users', { token })
      .then((user) => {
        if (user[0].id === req.tokenData.id) {
          return true;
        } else {
          return false;
        }
      }).catch((e) => {
        return false;
      });
  } else {
    return new Promise((resolve, reject) => {
      resolve(false);
    }).catch((err) => reject("err", err));//Promise  
  }
};

module.exports = {
  authenticate
}