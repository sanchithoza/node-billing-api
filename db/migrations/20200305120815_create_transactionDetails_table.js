
exports.up = function(knex) {
  return knex.schema.createTable('transactionDetails',(table)=>{
    table.increments('id')
    table.integer('transactionId').notNullable()
    table.integer('productId').notNullable()
    table.integer('qty').notNullable()
    table.string('unit').notNullable()
    table.float('taxablePrice').notNullable()
    table.float('gstRate')
    table.float('gstAmount')
    table.float('amount').notNullable()
  }).then(()=>console.log('transactionDetails table created success'))
  .catch((err)=>{
      console.log(err);
      throw err;
      
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('transactionDetails')
};
