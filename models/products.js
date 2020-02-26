const Sequelize = require('sequelize');
const {sequelize} = require('./sequelize.js');
const Model = Sequelize.Model;

const Product = sequelize.define('products',{
    productName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    productCatagory:{
        type:Sequelize.STRING,
        allowNull:false
    },
    manufacturedBy:{
        type:Sequelize.STRING,
        allowNull:false
    },
    serialNo:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
        //options
});

Product.sync({force:true}).then(()=>{
    return Product.create({
        productName:'Keyboard',
        productCatagory:'input',
        manufacturedBy:'artis',
        serialNo:'art123'
    });
});

var getAllProducts = () => {
    return Product.findAll();
};

module.exports = {
    Product,
    getAllProducts
}