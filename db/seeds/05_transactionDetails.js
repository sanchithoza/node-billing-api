
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('transactionDetails').del()
    .then(function () {
      // Inserts seed entries
      return knex('transactionDetails').insert([
        {
          transactionId: 1,
          productId:1,
          qty:10,
          unit:'Pcs',
          price:190.8,
          cgstRate:9,
          sgstRate:9
        },
        {
          transactionId: 1,
          productId:2,
          qty:20,
          unit:'Pcs',
          price:290.8,
          igstRate:9
        }
      ]);
    });
};
