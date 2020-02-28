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
var addNewUser = (data)=> {
  return User.sync({ force: true }).then(() => {
  //Now the `users` table in the database corresponds to the model definition
     return User.create({
     fullName: data.fullName,
     userName: data.userName,
     password: data.password
   },{
   returning:true
   });
 });
 }; 

var updateUser = (id,data) => {
  return User.update({
    fullName: data.fullName,
     userName: data.userName,
     password: data.password
  },{
  returning:true,
  where:{
    id:id
  }
  });
};
var deleteUser = (id) => {
  return User.destroy({
    where:{
      id:id
    }
  });
};
var userLogin = (uid,pass)=>{
  return User.findOne({
    where:{
      userName:uid,
      password:pass
    }
  });
};
var updateUserToken = (id,access,token)=>{
  return User.update({
    access:access,
    token:token
  },{
    returning:true,
    where:{
      id:id
    }
  });
};
var findUserByToken = (token)=>{
  return User.findAll({
    where:{
      token:token
    }
  });
};
  module.exports = {
    User,
    getAllUsers,
    getUserById,
    addNewUser,
    updateUser,
    deleteUser,
    userLogin,
    updateUserToken,
    findUserByToken
  }