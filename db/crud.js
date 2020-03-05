const knex = require('./knex.js');

const insert = (table,data)=>{
    return knex(table).insert(data).returning('*');
 };
const readAll = (table)=>{
    return knex.select().table(table);
};
const read = (table,id)=>{
    return knex.select().table(table).where('id',id);
}
const update = (table,data,id)=>{
    return knex.table(table).update(data).where('id',id).returning('*');
};
const del = (table,id)=>{
    return knex.delete().table(table).where('id',id).returning('*');
}
const login = (table,data)=>{
    return knex.select().table(table).where(data);
}
const readByToken = (table,data)=>{
    return knex.select().table(table).where(data);
}
module.exports = {
     insert,
     readAll,
     read,
     update,
     del,
     login,
     readByToken
 }