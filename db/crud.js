const knex = require('./knex.js');
//inserting data to specefied table
const insert = (table,data)=>{
    return knex(table).insert(data).returning('*');
 };
 //fetch all data from specefied table
const readAll = (table)=>{
    return knex.select().table(table);
};
//fetch data of given id from specefied table
const read = (table,id)=>{
    return knex.select().table(table).where('id',id);
}
const readWhere = (table,filter)=>{
    return knex.select().table(table).where(filter);
}
//update data of given id in specefied table
const update = (table,data,id)=>{
    return knex.table(table).update(data).where('id',id).returning('*');
};
//delete data of given id from specefied table
const del = (table,id)=>{
    return knex.delete().table(table).where('id',id).returning('*');
}

module.exports = {
     insert,
     readAll,
     read,
     update,
     del,
     readWhere
 }