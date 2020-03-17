const {readWhere} = require('./crud');
//fetch user data based on credentials{userName,password}
const login = (table, data) => {
    return readWhere(table,data).then((result)=>result).catch((err)=>err);
    //return knex.select().table(table).where(data);
}
//fetch user data based on auth token
const readByToken = (table, data) => {
    return readWhere(table,data).then((result)=>result).catch((err)=>err);
}
module.exports = {
    login,
    readByToken
}