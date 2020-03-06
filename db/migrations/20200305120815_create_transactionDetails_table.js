
exports.up = function(knex) {
  return knex.schema.createTable('transactionDetails',(table)=>{
    table.increments('id')
    table.integer('transactionId').notNullable()
    table.integer('productId').notNullable()
    table.integer('qty').notNullable()
    table.string('unit').notNullable()
    table.float('price').notNullable()
    table.float('cgstRate')
    table.float('sgstRate')
    table.float('igstRate')
  }).then(()=>console.log('transactionDetails table created success'))
  .catch((err)=>{
      console.log(err);
      throw err;
      
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('transactionDetails')
};
