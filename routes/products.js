const { insert, read, readAll, update, del } = require('./../db/crud');
const { authenticate } = require('./../middleware/authentication');
async function routes(fastify, options) {
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
    //get all products
    fastify.get('/', { preHandler: authentic }, (req, res) => {
        readAll('products').then((result) => {
            res.status(200).send(result);
        }).catch((e) => res.status(400).send(e));
    });
    //get product by id
    fastify.get('/:id', { preHandler: authentic }, (req, res) => {
        read('products', req.params.id).then((result) => {
            res.status(200).send(result);
        }).catch((e) => res.status(400).send(e));
    });
    //add new product
    fastify.post('/', { preHandler: authentic }, (req, res) => {
        insert('products', req.body).then((result) => {
            res.status(200).send(result);
        }).catch((e) => res.status(400).send(e));
    });
    //update product by id
    fastify.patch('/:id', { preHandler: authentic }, (req, res) => {
        update('products', req.body, req.params.id).then((result) => {
            res.status(200).send(result);
        }).catch((e) => res.status(400).send(e));
    });
    //delete product by id
    fastify.delete('/:id', { preHandler: authentic }, (req, res) => {
        del('products', req.params.id).then((result) => {
            res.status(200).send(result);
        }).catch((e) => res.status(400).send(e));
    });
};

module.exports = routes;