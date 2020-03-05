
exports.up = function(knex) {
  return knex.schema.createTable('products',(table)=>{
    table.increments('id')
    table.string('productName').notNullable()
    table.string('productCategory').notNullable()
    table.string('company')
    table.string('serialNo')
  }).then(() => console.log("Product table created"))
  .catch((err) => { console.log(err); throw err });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
