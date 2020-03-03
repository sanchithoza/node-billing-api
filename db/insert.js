const knex = require('./knex.js');

const insert = (table,data)=>{
    return knex(table).insert(data).returning('*');
 };

 module.exports = {
     insert
 }