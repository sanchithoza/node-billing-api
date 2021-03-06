//Imports
const fastify = require('fastify')();

var PORT = process.env.PORT || 3000;
//fastify cors to enable access from other server/environment
fastify.register(require('fastify-cors'), {
    origin: true
});
//registering jwt plugin with fastify
fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
});
//routes
fastify.register(require('./routes/users'), { prefix: '/users' });
fastify.register(require('./routes/persons'), { prefix: '/persons' });
fastify.register(require('./routes/products'), { prefix: '/products' });
fastify.register(require('./routes/transactions'), { prefix: '/transactions' });
fastify.register(require('./routes/reports'),{ prefix:'/reports'});
//Listener
/*fastify.listen(PORT, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        console.log(`server is listning on ${PORT}`);
    }
});*/

module.exports={
    fastify
}