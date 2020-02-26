const {authenticate} = require('./../middleware/authentication');
const {sequelize} = require('./../models/sequelize.js');
const Persons = require('./../models/persons');

async function routes(fastify,options){
    fastify.get('/',(req,res)=>{
        Persons.getAllPersons().then((result)=>{
            res.send(result);
        }).catch((e)=>res.send(e))
    });

    fastify.get('/:id',(req,res)=>{
        Persons.getPersonById(req.params.id).then((result)=>{
            res.send(result);
        }).catch((e)=>res.send(e));
    });
    fastify.post('/',(req,res)=>{
        Persons.addPerson(req.body).then((result)=>{
            res.status(400).send(result);
        }).catch((e)=>{
            res.status(400).send('erroe >',e)
        });
    });
    fastify.patch('/:id',(req,res)=>{
        Persons.updatePerson(req).then((result)=>{
            res.status(200).send(result);
        }).catch((e)=>res.status(400).send(e));
    });
    fastify.delete('/:id',(req,res)=>{
        Persons.deletePerson(req.params.id).then((result)=>{
            res.status(200).send(result);
        }).catch((e)=>res.status(400).send(e));
    })
};


module.exports = routes;
