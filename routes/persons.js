const {insert,read,readAll,update,del}=require('./../db/crud');
const {authenticate} = require('./../middleware/authentication');
async function routes(fastify,options){
    var authentic = (req,res,done)=>{
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
            done()
        });
    };
    //get all persons
    fastify.get('/',(req,res)=>{
        readAll('persons').then((result)=>{
            res.status(200).send(result);
        }).catch((e)=>res.status(400).send(e));
    });
    //get person by id
    fastify.get('/:id',{preHandler:authentic},(req,res)=>{
        read('persons',req.params.id).then((result)=>{
            res.status(200).send(result);
        }).catch((e)=>res.status(400).send(e));
    });
    //add a new person
    fastify.post('/',{preHandler:authentic},(req,res)=>{
        insert('persons',req.body).then((result)=>{
            res.status(200).send(result);
        }).catch((e)=>{
            res.status(400).send('erroe >',e)
        });
    });
    //update person by id
    fastify.patch('/:id',{preHandler:authentic},(req,res)=>{
        update('persons',req.body,req.params.id).then((result)=>{
            res.status(200).send(result);
        }).catch((e)=>res.status(400).send(e));
    });
    //delete person by id
    fastify.delete('/:id',{preHandler:authentic},(req,res)=>{
        del('persons',req.params.id).then((result)=>{
            res.status(200).send(result);
        }).catch((e)=>res.status(400).send(e));
    })
};
module.exports = routes;
