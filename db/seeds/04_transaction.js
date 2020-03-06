
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('transactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('transactions').insert([
        { 
          transactionDate: new Date(),
          transactionType:'Sales',
          transactionMode:'Cash',
          personId:1,
          userId:1,
          netAmount:2000,
          totalTax:200,
          grossAmount:2200
        },
        { 
          transactionDate: new Date(),
          transactionType:'Purchase',
          transactionMode:'Cash',
          personId:1,
          userId:1,
          netAmount:5000,
          totalTax:500,
          grossAmount:5500
        }
      ]);
    });
};