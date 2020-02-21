//const user = require('./../db/db-users');
const {client} = require('./../db/db-connect');
const {SHA256} = require('crypto-js');
//const {authenticate} = require('./../middleware/authentication');
const JWT = require('fastify-jwt');
async function routes(fastify,options){
   
    fastify.get('/',(req,res)=>{
           
            getAllUsers()
            .then((result)=>{
                res.status(200).send(result);
            }).catch((err)=>{
                res.status(400).send(err.message);
            });
        });//get all users
    fastify.get('/:id',(req,res)=>{
        getUserDetails(req.params.id)
        .then((row)=>{
            res.status(200).send(row);
        }).catch((err) => {
            res.status(400).send('no record Found with given id');
        });
    });//get user by id
    fastify.post('/',(req,res)=>{
        var user = req.body;
        hashPassword(user.password)
        .then((hash)=>{
            user.password = hash;
        })
        .then(()=>createUser(user))
        .then((user)=>{
            var id = user.id;
            const token = fastify.jwt.sign({id}).toString();
            return updateUserToken(user,token);
        })
        .then((user)=>{
            res.header('x-auth',user.token).status(201).send({user});
        })
        .catch((err)=>res.status(400).send("unable to insert record",err));
    });//add new user//signup
    fastify.patch('/:id',(req,res)=>{
        getUserDetails(req.params.id)
        .then((rows)=>updateUser(rows))
        .then((user)=>{
            res.status(200).send({user});
        })
        .catch((err) => {
            res.status(400).send("no record found",err);    
        });
    });//update existing user
    fastify.delete('/:id',(req,res)=>{
        getUserDetails(req.params.id)
        .then((row)=>deleteUser(row))
        .then((user)=>{
            res.status(200).send({user});
        })
        .catch((err) => {
            res.status(400).send("no record found",err);
        });
    });//delete a user
    fastify.post('/login',(req,res)=>{
                
        var userCredentials = req.body;    
        var user;
        if(!userCredentials.name || !userCredentials.password){
            res.send('provide username and password');
        }else{
            hashPassword(userCredentials.password)
            .then((hash)=>findUser(userCredentials.name,hash))            
            .then((user)=>{
                var id = user.id;
                const token = fastify.jwt.sign({id}).toString();
                return updateUserToken(user,token);
            })
            .then((user)=>{
               res.header('x-auth',user.token).status(201).send({user});
            })
            .catch((err)=>res.status(400).send("Unable to Login",err));
        }
    });//user login
}

// Handler functions
const hashPassword = (password) => {
    return new Promise((resolve,reject)=>{
        resolve(SHA256(password).toString());
    }).catch((err)=>reject(err));
};

const createUser = (user)=>{
    return client.query("INSERT INTO users(name, password, role)VALUES ($1, $2, $3) RETURNING *", [user.name, user.password, user.role])
    .then((data)=> data.rows[0])
    .catch((err)=> err);
};

const updateUserToken = (user,token) => {
    const access = 'access';
    user.token = token;
    user.access = 'access';
    return client.query("UPDATE users SET access=$1, token=$2  WHERE id = $3 RETURNING *",[access,token,user.id])
    .then((result)=> result.rows[0])
    .catch((err)=> err);
};

const updateUser = (rows) => {      
    var name = req.body.name || rows[0].name;
    var password = req.body.password || rows[0].password;
    var role = req.body.role || rows[0].role;
    return client.query("UPDATE users SET name=$1, password=$2, role=$3 WHERE id = $4 RETURNING *",[name,password,role,req.params.id])
    .then((result)=>result.rows[0])
    .catch((err)=>err);
};

const deleteUser = (rows) => {
    return client.query("delete from users where id = $1 RETURNING *",[rows.id])
    .then((result)=>result.rows[0])
    .catch((err)=> err);
};

const getAllUsers = () => {
    return  client.query("select * from users")
    .then((result)=> result.rows)
    .catch((err)=> err);
}

const findUser = (username,hashPassword) => {
    return client.query("select id,token from users where name = $1 and password = $2",[username,hashPassword])
    .then((result)=>{
        return result.rows[0];
    })
    .catch((err)=> err);
}

const getUserDetails = (id)=>{
    return new Promise((resolve,reject)=>{
        client.query("select * from users where id = $1",[id],(err,result)=>{
            if(err){
                reject(err);
            }
            if(result.rows.length > 0){
                resolve(result.rows[0]);
            }else{
                reject();
            }
        });
    });
};

var authenticate = (req) => {
    var token = req.headers['x-auth'];
  
  if(token){
    findByToken(token)
    .then((user) => {
      if (user.token === token) {
        console.log('one');
        
        return true;
      }else{
        console.log('two');
          return false;
      }
    }).catch((e) => {
        console.log('three');
        return false;
    });
  }else{
    console.log('four');
      return false;
  }
};
  
  
  const findByToken = (token) => {
      return client.query("SELECT * FROM users WHERE token = $1", [token])
        .then((result) => result.rows[0])
        .catch((err)=>err);
  }


module.exports = routes;