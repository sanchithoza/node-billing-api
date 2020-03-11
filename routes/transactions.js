const { read, readAll, readWhere } = require('./../db/crud');
const { authenticate } = require('./../middleware/authentication');
const { readTransactionDetail, addNewTransaction, deleteTransaction,updateTransaction } = require('./../db/transaction');
const { addTransactionSchema } = require('./../schema/transactionSchema');
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
    //to get list of all transaction
    fastify.get('/',{ preHandler: authentic }, (req, res) => {
        readAll('transactions').then((result) => {
            res.status(200).send(result);
        }).catch((err) => res.status(400).send(err));
    });
    //to get details of a perticular transaction by transactionID
    fastify.get('/:id',{ preHandler: authentic }, (req, res) => {
        readTransactionDetail('transactions', req.params.id).then((result) => {
            res.status(200).send(result);
        }).catch((err) => res.status(400).send(err));
    });
    //to get filterd list of transaction by sending filter critaria in req.body
    fastify.post('/filter',{ preHandler: authentic }, (req, res) => {
        readWhere('transactions', req.body).then((result) => {
            res.status(200).send(result);
        }).catch((err) => res.status(400).send(err));
    });
    //to add new invoice
    fastify.post('/',{ 
        schema:addTransactionSchema,
        attachValidation:true,
        preHandler: authentic 
    }, (req, res) => {
        if(req.validationError){
            res.status(422).send(req.validationError);
        }
        addNewTransaction('transactions', req.body).then((result) => {
            res.status(200).send(result);
        }).catch((err) => res.status(400).send(err));
    });
    //deleting a invoice
    fastify.delete('/:id',{preHandler:authentic},(req,res)=>{
       deleteTransaction('transactions',req.params.id).then((result)=>{
            res.status(200).send(result);
       }).catch((err)=>res.status(400).send(err));
    });
    //updating a transaction
    fastify.patch('/:id',{preHandler:authentic},(req,res)=>{
        updateTransaction('transactions',req.body,req.params.id).then((result)=>{
            res.status(200).send(result);
        }).catch((err)=>res.status(400).send(err));
    });
};
module.exports = routes

/*
Seed data for transection post
[{
    "transactionDate": "2020-03-04T18:30:00.000Z",
    "transactionType": "Purchase",
    "transactionMode": "Cash",
    "personId": 7,
    "userId": 20,
    "netAmount": 3000,
    "totalTax": 300,
    "grossAmount": 3300
 
},{
   "detail": [
        {
            "productId": 16,
            "qty": 10,
            "unit": "Pcs",
            "price": 190.8,
            "cgstRate": 9,
            "sgstRate": 9,
            "igstRate": null

        },
        {
        	"productId": 17,
            "qty": 20,
            "unit": "Pcs",
            "price": 290.8,
            "cgstRate": null,
            "sgstRate": null,
            "igstRate": 18

        }
    ]
}
] */