const {Client} = require('pg');

const client = new Client({
    user: "billing-api",
    host: "127.0.0.1",
    database: "billing",
    password: "admin",
    port: 5432
});
client.connect();

module.exports = {
    client
}