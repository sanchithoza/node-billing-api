const {client} = require('./../db/db-connect');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

findByToken(token)
  .then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send(e);
  });
};


const findByToken = (token) => {
    return client.query("SELECT * FROM users WHERE token = $1", [token])
      .then((result) => result.rows[0])
      .catch((err)=>err);
}

module.exports = {authenticate};
