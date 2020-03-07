const { read, readAll, readWhere } = require('./../db/crud');
const { readTransactionDetail, addNewTransaction } = require('./../db/transaction');
async function routes(fastify, options) {
    //to get list of all transaction
    fastify.get('/', (req, res) => {
        readAll('transactions').then((result) => {
            res.status(200).send(result);
        }).catch((err) => res.status(400).send(err));
    });
    //to get details of a perticular transaction by transactionID
    fastify.get('/:id', (req, res) => {
        readTransactionDetail('transactions', req.params.id).then((result) => {
            res.status(200).send(result);
        }).catch((err) => res.status(400).send(err));
    });
    //to get List of transaction by perticular person(party)
    fastify.get('/person/:id', (req, res) => {
        readWhere('transactions', { 'personId': req.params.id }).then((result) => {
            res.status(200).send(result);
        }).catch((err) => res.status(400).send(err));
    });
    //to get List of transactions added by a perticular user by UserId
    fastify.get('/user/:id', (req, res) => {
        readWhere('transactions', { 'userId': req.params.id }).then((result) => {
            res.status(200).send(result);
        }).catch((err) => res.status(400).send(err));
    });
    //to get filterd list of transaction by sending filter critaria in req.body
    fastify.post('/filter', (req, res) => {
        readWhere('transactions', req.body).then((result) => {
            res.status(200).send(result);
        }).catch((err) => res.status(400).send(err));
    });
    //to add new invoice
    fastify.post('/', (req, res) => {
        addNewTransaction('transactions', req.body).then((result) => {
            res.status(200).send(result);
        }).catch((err) => res.status(400).send(err));
    });
};
module.exports = routes

/*
Seed data for transection post
{
    "id": 1,
    "transactionDate": "2020-03-04T18:30:00.000Z",
    "transactionType": "Sales",
    "transactionMode": "Cash",
    "personId": 1,
    "userId": 1,
    "netAmount": 2000,
    "totalTax": 200,
    "grossAmount": 2200,
    "detail": [
        {
            "id": 1,
            "transactionId": 1,
            "productId": 1,
            "qty": 10,
            "unit": "Pcs",
            "price": 190.8,
            "cgstRate": 9,
            "sgstRate": 9,
            "igstRate": null,

        },
        {
            "id": 2,
            "transactionId": 1,
            "productId": 2,
            "qty": 20,
            "unit": "Pcs",
            "price": 290.8,
            "cgstRate": null,
            "sgstRate": null,
            "igstRate": 9,

        }
    ]
} */