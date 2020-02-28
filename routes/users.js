const {client} = require('./../db/db-connect');
const {SHA256} = require('crypto-js');
const {authenticate} = require('./../middleware/authentication');
const User = require('./../models/users');

async function routes(fastify,options){
    fastify.get('/',(req,res)=>{
        try{
            var token = req.headers['x-auth'];
            var tokenData = fastify.jwt.verify(token);
            req.tokenData = tokenData;
            
        }catch(e){
            console.log(e);
        }
        authenticate(req).then((result)=>{
             if(!result){ 

                res.status(400).send('Unable to authenticate user');    
            }
            return User.getAllUsers();
        }).then((result)=>{
            res.status(200).send(result);
        }).catch((err)=>{
            res.status(400).send(err.message);
        });
    });//get all users
    
    fastify.get('/:id',(req,res)=>{
        try{
            var token = req.headers['x-auth'];
            var tokenData = fastify.jwt.verify(token);
            req.tokenData = tokenData;
        }catch(e){
            console.log(e);
        }
        authenticate(req).then((result)=>{
            if(!result){ 
                res.status(400).send('Unable to authenticate user');    
            }
            return User.getUserById(req.params.id)
            .then((result)=>{
                res.status(200).send(result);
            }).catch((err) => {
                res.status(400).send('no record Found with given id');
            });
        });
    });//get user by id
    
    fastify.post('/',(req,res)=>{
        var user = req.body;
        hashPassword(user.password)
        .then((hash)=>{
            user.password = hash;
        })
        .then(()=>{
            return User.addNewUser(user)
        })
        .then((user)=>{
            var id = user.dataValues.id;
            var name = user.dataValues.userName;
            const token = fastify.jwt.sign({id,name}).toString();
            return User.updateUserToken(id,'full',token);
        })
        .then((user)=>{
             res.header('x-auth',user.token).status(201).send({user});
        })
        .catch((err)=>{
            console.log(err);
            
            res.status(400).send("unable to insert record",err)
        });
    });//add new user//signup
    
    fastify.patch('/:id',(req,res)=>{
        try{
            var token = req.headers['x-auth'];
            var tokenData = fastify.jwt.verify(token);
            req.tokenData = tokenData;
        }catch(e){
            console.log(e);
        }        
        authenticate(req).then((result)=>{
            if(!result){ 
                res.status(400).send('Unable to authenticate user');    
            }
            return User.updateUser(req.params.id,req.body)
        }).then((result)=>{
                res.status(200).send({result});
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send("no record found",err);    
            });
      
    });//update existing user
    
    fastify.delete('/:id',(req,res)=>{
        
        try{
            var token = req.headers['x-auth'];
            var tokenData = fastify.jwt.verify(token);
            req.tokenData = tokenData;
        }catch(e){
            console.log(e);
        }        
        
        authenticate(req).then((result)=>{
            if(!result){ 
                res.status(400).send('Unable to authenticate user');    
            }
            return User.deleteUser(req.params.id)
            }).then((result)=>{
                res.status(200).send({result});
            })
            .catch((err) => {
                res.status(400).send("no record found",err);
            });
    });//delete a user
    
    fastify.post('/login',(req,res)=>{
        var userCredentials = req.body;    
        if(!userCredentials.userName || !userCredentials.password){
            res.send('provide username and password');
        }else{
            hashPassword(userCredentials.password)
            .then((hash)=>User.userLogin(userCredentials.userName,hash))            
            .then((user)=>{
                var id = user.dataValues.id;
                var name = user.dataValues.userName;
                const token = fastify.jwt.sign({id,name}).toString();
                return User.updateUserToken(id,'admin',token);
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


module.exports = routes;