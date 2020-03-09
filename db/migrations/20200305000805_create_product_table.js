
exports.up = function(knex) {
  return knex.schema.createTable('products',(table)=>{
    table.increments('id')
    table.string('name').notNullable()
    table.string('hsncode').notNullable()
    table.string('category').notNullable()
    table.string('company')
    table.string('serialNo')
    table.integer('stock')
  }).then(() => console.log("Product table created"))
  .catch((err) => { console.log(err); throw err });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
