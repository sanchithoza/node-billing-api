const Sequelize = require('sequelize');
const {sequelize} = require('./sequelize.js');
const Model = Sequelize.Model;

const Person = sequelize.define('persons',{
//properties  -  columns
    businessName:{
        type:Sequelize.STRING,
        allowNull:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    relation:{
        type:Sequelize.STRING,
        allowNull:false
    },
    gstNo:{
        type:Sequelize.STRING,
        allowNull:true
    },
    contactNo:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:true,
         validate:{
            isEmail:true
        }
    },
    addressLine1:{
        type:Sequelize.STRING,
        allowNull:false
    },
    addressLine2:{
        type:Sequelize.STRING,
        allowNull:true,
        defaultValue:''
    },
    city:{
        type:Sequelize.STRING,
        allowNull:false,
        defaultValue:'Navsari'
    },
    state:{
        type:Sequelize.STRING,
        allowNull:false,
        defaultValue:'Gujarat'
    }
},{
    //options
});
/*Person.sync({ force: false }).then(() => {
    //Now the `users` table in the database corresponds to the model definition
       return Person.create({
       businessName: 'Rotac Corp',
       name: 'Ronak Mehta',
       relation: 'Customer',
       gstNo:'GST123PAN453',
       contactNo:'9898989898',
       email:'rotac.surat@gmail.com',
       addressLine1:'palsana chokdi',
       city:'Surat'
     });
});*/
var getAllPersons = ()=>{
    return Person.findAll();
}
var getPersonById = (id) => {
    return Person.findByPk(id);
  };
var addPerson = (data)=>{
    return Person.sync({ force: false }).then(() => {
    return Person.create({
        businessName: data.businessName,
        name: data.name,
        relation: data.relation,
        gstNo:data.gstNo,
        contactNo:data.contactNo,
        email:data.email,
        addressLine1:data.addressLine1,
        addressLine2:data.addressLine2,
        city:data.city,
        state:data.state
      });
    });
};
var updatePerson = (req)=>{
    let id = req.params.id;
    let data = req.body;
    console.log(id,data); 
    return Person.update(
        {
        businessName: data.businessName,
        name: data.name,
        relation: data.relation,
        gstNo:data.gstNo,
        contactNo:data.contactNo,
        email:data.email,
        addressLine1:data.addressLine1,
        addressLine2:data.addressLine2,
        city:data.city,
        state:data.state
        },
        {returning: true, where: {id:id} }
      )   
};

var deletePerson = (id)=>{
    return Person.destroy({
        returning: true, 
        where: {
            id:id
        } 
    });
};

module.exports={
    Person,
    getAllPersons,
    getPersonById,
    addPerson,
    updatePerson,
    deletePerson
}