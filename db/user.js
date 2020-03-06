const knex = require('./knex');
//fetch user data based on credentials{userName,password}
const login = (table,data)=>{
    return knex.select().table(table).where(data);
}
//fetch user data based on auth token
const readByToken = (table,data)=>{
    return knex.select().table(table).where(data);
}
module.exports = {
    login,
    readByToken
}