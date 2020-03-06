
exports.up = function(knex) {
  return knex.schema.createTable('transactions',(table)=>{
    table.increments('id')
    table.date('transactionDate').notNullable()
    table.string('transactionType').notNullable()
    table.string('transactionMode').notNullable()
    table.integer('personId').notNullable()
    table.integer('userId').notNullable()
    table.float('netAmount').notNullable()
    table.float('totalTax').notNullable()
    table.float('grossAmount').notNullable()
  }).then(()=>console.log("transaction table created"))
  .catch((err)=>{
    console.log(err);
    throw err;
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
