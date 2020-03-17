const {fastify} = require('./app');
var PORT = process.env.PORT || 3000;

fastify.listen(PORT, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        console.log(`server is listning on ${PORT}`);
    }
});
