const Product = require('./../models/products');

async function routes(fastify,options){
     fastify.get('/',(req,res) => {
        Product.getAllProducts().then((result)=>{
            res.status(200).send(result);
        }).catch((e)=>res.status(400).send(e));
    });
   /* fastify.get('/:id',(req,res)=>{
        res.status(200).send('result');
    });
    fastify.post('/',(req,res)=>{
        res.status(200).send('result');
    });
    fastify.patch('/:id',(req,res)=>{
        res.status(200).send('result');
    });
    fastify.delete('/:id',(req,res)=>{  
        res.status(200).send('result');
    });*/
};

module.exports = routes;