
exports.seed = function(knex,Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      /*"fullName":"sanchit oza",
         "userName":"sanchit",
          "password":"1234" ,
          "role":"admin",
          "access":"full",
          "token":"null"*/
      return knex('users').insert([
        {
          fullName: 'sanchit oza',
          userName:'sanchit',
          password:'1234',
          role:'admin',
          access:'full',
          token:'null'
        },
        {
          fullName: 'ankit oza',
          userName:'ankit',
          password:'1234',
          role:'admin',
          access:'full',
          token:'null'
        },
        {
          fullName: 'bapu oza',
          userName:'bapu',
          password:'1234',
          role:'admin',
          access:'full',
          token:'null'
        }
        
      ]);
    });
};
