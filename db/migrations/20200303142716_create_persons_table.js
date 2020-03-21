
exports.up = function(knex,Promise) {
          return knex.schema.createTable('persons', (table) => {
            table.increments('id')
            table.string('businessName')
            table.string('name').notNullable()
            table.string('relation').notNullable()
            table.string('gstNo')
            table.string('contactNo').notNullable()
            table.string('email')
            table.string('addressLine1').notNullable()
            table.string('addressLine2')
            table.string('city').notNullable()
            table.string('state').notNullable()
          }).then(() => console.log("Peroson table created"))
            .catch((err) => { console.log(err); throw err });
        
};

exports.down = function(knex,Promise) {
    return knex.schema.dropTable('persons');
};
