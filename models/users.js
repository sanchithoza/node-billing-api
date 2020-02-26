const Sequelize = require('sequelize');
const {sequelize} = require('./sequelize.js');
const Model = Sequelize.Model;

//next line will call Model.init Method
const User = sequelize.define('users', {
    // attributes
    fullName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userName: {
      type: Sequelize.STRING,
      allowNull: false
      // allowNull defaults to true
    },
    password:{
        type: Sequelize.STRING,
      allowNull: false
    },
    role:{
        type: Sequelize.STRING,
        defaultValue: 'admin'
    },
    access:{
        type: Sequelize.STRING,
        defaultValue:'admin'
    },
    token:{
        type: Sequelize.STRING,
        defaultValue:''
    }
  }, {
    // options
  });

  var addUser = (req)=> {
   return User.sync({ force: true }).then(() => {
   //Now the `users` table in the database corresponds to the model definition
      return User.create({
      fullName: req.body.fullName,
      userName: req.body.userName,
      password: req.body.password
    });
  });
  }; 
var getAllUsers = () => {
  return User.findAll({
    attributes:['fullName','userName','role']
  });
};  
var getUserById = (id) => {
  return User.findAll({
    WHERE:{
      'id':id
    }
  });
};

  module.exports = {
    User,
    addUser,
    getAllUsers
  }