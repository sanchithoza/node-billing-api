
exports.seed = function(knex,Promise) {
  // Deletes ALL existing entries
  return knex('persons').del()
    .then(function () {
      // Inserts seed entries
      return knex('persons').insert([
        {
          businessName:'business',
          name:'arihant',
          relation:'customer',
          gstNo:'1234',
          contactNo:'9876543210',
          email:'sanchit@oza.com',
          addresssLine1:'ashapuri complex',
          city:'navsari',
          state:'gujarat'
        }
      ]);
    });
};
