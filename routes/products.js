const Product = require('./../models/products');

async function routes(fastify,options){
     fastify.get('/',(req,res) => {
        Product.getAllProducts().then((result)=>{
            res.status(200).send(result);
        }).catch((e)=>res.status(400).send(e));
    });
   fastify.get('/:id',(req,res)=>{
        Product.getProductById(req.params.id).then((result)=>{
            res.status(200).send(result);
        }).catch((e)=>res.status(400).send(e));
    });
    fastify.post('/',(req,res)=>{
        Product.addNewProduct(req.body).then((result)=>{
            res.status(200).send(result);
        }).catch((e)=>res.status(400).send(e));
    });
    fastify.patch('/:id',(req,res)=>{
        Product.updateProduct(req.params.id,req.body).then((result)=>{
            res.status(200).send(result);
        }).catch((e)=>res.status(400).send(e));
    });
    fastify.delete('/:id',(req,res)=>{  
        Product.deleteProduct(req.params.id).then((result)=>{
            res.status(200).send(result);
        }).catch((e)=>res.status(400).send(e));
    });
};

module.exports = routes;