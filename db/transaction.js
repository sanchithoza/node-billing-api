const _ = require('lodash');
const knex = require('./knex.js');
const { read, readWhere, insert, del, deleteWhere,update } = require('./crud');
const addNewTransaction = (table, data) => {
    var transaction = data[0];
    var transactionDetail = data[1];
    //adding common detail of transaction to transactions table
    return Promise.all([insert(table, transaction), transactionDetail])
        .then((result) => {
            result[1].detail.forEach(element => {
                element.transactionId = result[0][0].id;
            });
            //adding productwise detail of transation to transactionDetails table
            return Promise.all([result[0][0], insert('transactionDetails', result[1].detail)])
        })
        .then((result) => {
            //to update stock on purchase transaction
            updateStock(result);   
            return result;
        }).catch((err) => {
            return err;
        });
};
const readTransactionDetail = (table, id) => {
    return read(table, id)
        .then((result) => {
            //getting person name and adding to result array
            return Promise.all([read('persons', result[0].personId), result])
        })
        .then(([res, result]) => {
            result[0].person = res[0].name;
            //getting username and adding to result array
            return Promise.all([read('users', result[0].userId), result])
        })
        .then(([res, result]) => {
            result[0].user = res[0].fullName;
            //getting transaction details and adding to result array
            return Promise.all([readWhere('transactionDetails', { transactionId: result[0].id }), result])
        })
        .then(([detail, result]) => {
            result[0]['detail'] = detail;
            //getting product name for each product in productDetails result adding to array
            return getProductName(result[0])
        })
        .then((data) => {
            //calculations to make various totals for amount and taxes
            return data;
        }).catch((err) => {
            return err;
        });
};
const deleteTransaction = (table, id) => {
    //get details of transaction to be deleted
    return readTransactionDetail(table,id)
    .then((result)=>{
       //first deletes all entries from transactionDetails table as per given transaction Id
    return Promise.all ([deleteWhere('transactionDetails', { 'transactionId': id }),result]);
    }).then((result) => {
        //after deleting associated entries from transactionDetails it will delete transaction entry
        //from transaction table
       updateStockOnDelete(result[1]);
        return del(table, id);
    }).then((result) => {
        //console.log(result);
        return result;
    }).catch((err) => {
        return err;
    });
}

const updateTransaction = (table, data, id) => {
    return deleteTransaction(table,id).then((result)=>{
        console.log("delete :", result);
        
        return addNewTransaction(table,data).then((result)=>{
            console.log("insert :", result);
        }).catch((err)=>{
            console.log("err : ",err);
        });
    })

}


//function to get productName
async function getProductName(data) {
    for (var i = 0; i < data.detail.length; i++) {
        //fetch product name 
        await read('products', data.detail[i].productId).then((res) => {
            data.detail[i].product = res[0].name;
        });
    };
    return data;
}
//function to update stock on Purchase-Sales & Returns
function updateStock(result){
    //console.log(result[0].transactionType);            
    if(result[0].transactionType == 'Sales' || result[0].transactionType == 'PurchaseReturn'){
        result[1].forEach(element => {
            knex.raw(`update products set stock = stock - ${element.qty}  where id = ${element.productId} returning stock`).then((result)=>{
                console.log('Stock Updated Success.');
            }).catch((err)=>{
                console.log('error in updating stock'); 
            });
        });
    }
    else if(result[0].transactionType == 'Purchase' || result[0].transactionType == 'SalesReturn'){
        result[1].forEach(element => {
            knex.raw(`update products set stock = stock + ${element.qty}  where id = ${element.productId} returning stock`).then((result)=>{
                console.log('Stock Updated Success.');
            }).catch((err)=>{
                console.log('error in updating stock'); 
            });
        });
    }   
};
function updateStockOnDelete(result){
    //console.log("function :",result.transactionType);
    if(result.transactionType == 'Sales' || result.transactionType == 'PurchaseReturn'){
        result.detail.forEach(element => {
            knex.raw(`update products set stock = stock + ${element.qty}  where id = ${element.productId} returning stock`).then((result)=>{
                console.log('Stock Updated Success.');
            }).catch((err)=>{
                console.log('error in updating stock'); 
            });
        });
    }
    else if(result.transactionType == 'Purchase' || result.transactionType == 'SalesReturn'){
        result.detail.forEach(element => {
            knex.raw(`update products set stock = stock - ${element.qty}  where id = ${element.productId} returning stock`).then((result)=>{
                console.log('Stock Updated Success.');
            }).catch((err)=>{
                console.log('error in updating stock'); 
            });
        });
    }   
}
module.exports = {
    readTransactionDetail,
    addNewTransaction,
    deleteTransaction,
    updateTransaction
}