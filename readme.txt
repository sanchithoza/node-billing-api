//db to store database connection and all other database operation usin KNEXJS
    //migrations to populate db with tables
    //seed to generate testing data
//middleware to create middleware  authantications
//server.js Main file handling requests and response
//routes files to manage routes based on db tables
//Schema files to verify incomin data with post-patch request using fastify.routes operation

//add invoiceNumber field in transaction table



//for range search
//whereBetween — .whereBetween(column, range) / .orWhereBetween
knex('users').whereBetween('votes', [1, 100])

//impliment test cases for all routes

//impliment swager for api documentation