const { SHA256 } = require('crypto-js');
const { authenticate } = require('./../middleware/authentication');
const { insert, readAll, read, update, del } = require('./../db/crud');
const { login } = require('./../db/user');
const { loginSchema,signupSchema,updateUserSchema } = require('./../schema/userSchema');
const fs = require('fs');
/* var Ajv = require('ajv');
var ajv = new Ajv(); */
async function routes(fastify, options) {

    //getting token from header in preHandler to verify the token
    var authentic = (req, res, done) => {
        try {
            var token = req.headers['x-auth'];
            var tokenData = fastify.jwt.verify(token);
            req.tokenData = tokenData;
        } catch (e) {
            console.log(e);
        }
        authenticate(req).then((result) => {
            if (!result) {
                res.status(400).send('Unable to authenticate user');
            }
            done()
        });
    };
    //Add New User
    //fastify.post('/',{ preHandler: authentic }, (req, res) => {
      //  insert('users', req.body).then((result) => {
       //     res.status(200).send(result);
       // }).catch((err) => res.status(400).send(err));
   // });
    //get All Users
    fastify.get('/', { preHandler: authentic },(req, res) => {
        readAll('users').then((result) => {
            res.status(200).send(result);
        }).catch((err) => res.status(400).send(err));
    });
    //get user by id
    fastify.get('/:id', { preHandler: authentic }, (req, res) => {
        read('users', req.params.id).then((result) => {
            res.status(200).send(result);
        }).catch((err) => res.status(400).send(err));
    });
    //update user by id
    fastify.patch('/:id',{
        schema:updateUserSchema,
        attachValidation:true,
        preHandler:authentic
    } ,(req, res) => {
        if(req.validationError){
            res.status(422).send(req.validationError);
        }
        update('users', req.body, req.params.id).then((result) => {
            res.status(300).send(result);
        }).catch((err) => res.status(400).send(err));
    });
    //delete user by id
    fastify.delete('/:id',
     {
         preHandler:authentic
     },(req, res) => {
        del('users', req.params.id).then((result) => {
            res.status(200).send(result);
        }).catch((err) => res.status(400).send(err));
    });
   
    //user login generating token
    fastify.post('/login', {
        schema: loginSchema,
        attachValidation: true
    }, (req, res) => {
        
        if (req.validationError) {
            res.status(422).send(req.validationError);
        }
        //hashing password
        req.body.password = SHA256(req.body.password).toString();
        //sending login credentials for db verification
        login('users', req.body).then((result) => {
            if (result.length < 1) {
                res.status(400).send("Unable to find user with given UserId or Password");
            }
            //updating token if user is found using : update(table,data,id)
            return update('users', {
                'token': fastify.jwt.sign({
                    'id': result[0].id,
                    'access': result[0].access
                }).toString()
            }, result[0].id)
        })
            .then((result) => {
                res.header('x-auth', result[0].token).status(200).send(result);
            }).catch((err) => {
                //  console.log(err);
                res.status(400).send('Unable to Login.', err);
            });
    });
    //user signup with token
    fastify.post('/signup',{
        schema:signupSchema,
        attachValidation:true
    },(req, res) => {
        if (req.validationError) {
            res.status(422).send(req.validationError);
        }
       //hashing password
        req.body.password = SHA256(req.body.password).toString();
        //generating token
        req.body.token = fastify.jwt.sign({ 'id': req.body.id, 'access': req.body.access }).toString();
        //adding new user with signup route
        insert('users', req.body).then((result) => {
            res.header('x-auth', result[0].token).status(200).send(result);
        }).catch((err) => res.status(400).send(err));
    });
};
module.exports = routes;