const {knex} = require('./knex');
const _ = require('lodash');
const {read,readWhere} = require('./crud');
const getPersonalAccount = (id) => {
    //getting personal detail by id
    return read('persons',id).then((result)=>{
        //geting records from transaction table based on personId 
        return Promise.all ([result,readWhere('transactions',{'personId':result[0].id})]);
    }).then((result)=>{
        //formating JSON response tobe sent back
        var data = {};
        personalDetail = result[0][0];
        data.personalDetail = personalDetail;
        data.CreditSales = [];
        data.CashSales = [];
        data.CreditPurchase=[];
        data.CashPurchase=[];
        //traversing to through each transaction and pushing then in specific catagories
        result[1].forEach(element => {
            var record = {
                'transactionDate':element.transactionDate,
                'transactionType':element.transactionType,
                'transactionMode':element.transactionMode,
                'totalAmount':element.grandTotal
            };
            if(element.transactionMode == 'Credit' && element.transactionType == 'Sales'){
                data.CreditSales.push(record);
            }
            else if(element.transactionMode == 'Cash' && element.transactionType == 'Sales'){
                data.CashSales.push(record);
            }
            else if(element.transactionMode == 'Credit' && element.transactionType == 'Purchase'){
                data.CreditPurchase.push(record);
            }
            else if(element.transactionMode == 'Cash' && element.transactionType == 'Purchase'){
                data.CashPurchase.push(record);
            }
        });
        //calculating due amount based on credit sales and purchase transactions
        var amountDue  = _.sumBy(data.CreditSales,'totalAmount') - _.sumBy(data.CreditPurchase,'totalAmount');
        data.personalDetail.DueAmount = amountDue;
        return data;
    }).catch((err)=>{
        console.log(err);       
    });
};
module.exports = {
    getPersonalAccount
};