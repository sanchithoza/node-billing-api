
exports.up = function(knex,Promise) {
    
          return knex.schema.createTable('users', (table) => {
            table.increments('id')
            table.string('fullName').notNullable()
            table.string('userName').notNullable()
            table.string('password').notNullable()
            table.string('role').notNullable()
            table.string('access').notNullable()
            table.string('token')
          }).then(() => console.log("User table created"))
            .catch((err) => { console.log(err); throw err });
    };
      


exports.down = function(knex,Promise) {
    return knex.schema.dropTable('users');
};
