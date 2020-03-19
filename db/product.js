const _ = require('lodash')
const { readWhere } = require('./crud');
const records = (type,data) => {
    //get all sales transactions
    return readWhere('transactions', { transactionType: type })
        .then((result) => {
             //get filtered transactions as per the filters specefied in req.body
            return Promise.all([result, readWhere('transactionDetails', data)]);
        })
        .then((result) => {
            data = [];
            if(result[0].alert){
                throw result[0].alert;
            }
            if(result[1].alert){
                throw result[1].alert;
            }
            result[0].forEach(elementOuter => {
                result[1].forEach(elementInner => {
                    if (elementOuter.id === elementInner.transactionId) {
                        //createing record for individual transaction having similer transactionid 
                        //in transactions & transactionDetails table
                        var record = {
                            'transactionId': elementInner.transactionId,
                            'transactionType': elementOuter.transactionType,
                            'productId': elementInner.productId,
                            'productPrice': elementInner.amount
                        }
                        data.push(record);
                    }

                });
            });
            data.push({ "Total Amount": _.sumBy(data, 'productPrice') });
            return data;
        }).catch((err) => {
            return err;
        });
};


module.exports = {
    records
}