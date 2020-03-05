
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          id: 1, 
          productName: 'mk210',
          productCategory:'KeyboardMouseCombo',
          company:'zebronics',
          serialNo:'zebmk210'
        },
        {
          id: 2, 
          productName: 'zeb Dash',
          productCategory:'MouseWireless',
          company:'logitech',
          serialNo:'logMWL222'
        }
      ]);
    });
};
