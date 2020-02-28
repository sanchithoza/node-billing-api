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

/*Product.sync({force:true}).then(()=>{
    return Product.create({
        productName:'Keyboard',
        productCatagory:'input',
        manufacturedBy:'artis',
        serialNo:'art123'
    });
});*/

var getAllProducts = () => {
    return Product.findAll();
};
var getProductById = (id)=>{
    return Product.findByPk(id);
};
var addNewProduct = (data) =>{
    return Product.sync({ force: false }).then(() => {
        return Product.create({
            productName:data.productName,
            productCatagory:data.productCatagory,
            manufacturedBy:data.manufacturedBy,
            serialNo:data.serialNo
          });
        });
};
var updateProduct = (id,data) => {
    return Product.update({
        productName:data.productName,
        productCatagory:data.productCatagory,
        manufacturedBy:data.manufacturedBy,
        serialNo:data.serialNo
    },
    {
        returning: true, 
        where: {
            id:id
        } 
    });
};
var deleteProduct = (id) => {
    return Product.destroy({
        returning:true,
        where:{
            id : id
        }
    });
};

module.exports = {
    Product,
    getAllProducts,
    getProductById,
    addNewProduct,
    updateProduct,
    deleteProduct
}