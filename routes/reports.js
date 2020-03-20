const { getFields } = require('./../db/crud');
const { getTransactionsByFilters } = require('./../db/reports');
async function routes(fastify,options){
    //get list of persons based on relation
    fastify.get('/persons/:relation',(req,res)=>{
       getFields('persons',['id','businessName','name'],{relation : req.params.relation}).then((result)=>{
           res.status(200).send(result);
       }).catch((err)=>res.status(400).send(err));
    });
    //get list of persons based on relation and search filters [filters can be city, state]
    //filters will be passed as post request object 
    fastify.post('/persons/:relation',(req,res)=>{
        getFields('persons',['id','businessName','name'],req.body).then((result)=>{
            res.status(200).send(result);
        }).catch((err)=>res.status(400).send(err));
     });
     //get list of transactions with
     //filters Like 
     //transactionType:'sales,purchase,etc.'
     //transactionMode:'Cash,credit,etc'
     //personId
     //userId
     //for providing date filter must send startDate & endDate in post Request Object
     fastify.post('/transactions',(req,res)=>{
        getTransactionsByFilters('transactions',req.body).then((result)=>{
            res.status(200).send(result);
        }).catch((err)=>{
            res.status(400).send(err)
        });
     });
     //get product details based on various filters
     //filter will be sent as post request object
     fastify.post('/products',(req,res)=>{
        getFields('products',['serialNo','name','category','company'],req.body).then((result)=>{
            res.status(200).send(result);
        }).catch((err)=>res.status(400).send(err));
     });
};
module.exports = routes;