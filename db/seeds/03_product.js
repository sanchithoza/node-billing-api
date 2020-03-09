
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          name: 'mk210',
          hsncode:'5410',
          category:'mouse',
          company:'zebronics',
          serialNo:'zeb0987',
          stock:10
        },
        { 
          name: 'b200',
          hsncode:'5410',
          category:'mouse',
          company:'logitech',
          serialNo:'b200',
          stock:10
        }
      ]);
    });
};
