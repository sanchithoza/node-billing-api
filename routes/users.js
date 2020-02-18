const user = require('./../db/db-users');
async function routes(fastify,options){
    fastify.get('/',user.getUsers);
    fastify.get('/:id',user.getUserById);
    fastify.post('/',user.createUser);
    fastify.patch('/:id',user.updateUser);
    fastify.delete('/:id',user.deleteUser);
}

module.exports = routes;