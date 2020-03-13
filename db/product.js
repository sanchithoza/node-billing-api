const _ = require('lodash')
const { readWhere } = require('./crud');
const salesRecord = (data) => {
    //get all sales transactions
    return readWhere('transactions', { transactionType: 'Sales' })
        .then((result) => {
            //get filtered transactions as per the filters specefied in req.body
            return Promise.all([result, readWhere('transactionDetails', data)]);
        })
        .then((result) => {
            data = [];
            result[0].forEach(elementOuter => {
                result[1].forEach(elementInner => {
                    if (elementOuter.id === elementInner.transactionId) {
                        //createing record for individual transaction having similer id 
                        //in transactions & transactionDetails table
                        var record = {
                            'transactionInnerId': elementInner.transactionId,
                            'transactionOuterId': elementOuter.id,
                            'transactionType': elementOuter.transactionType,
                            'productId': elementInner.productId,
                            'productPrice': elementInner.amount
                        }
                        data.push(record);
                    }

                });
            });
            data.push({ "totalSales": _.sumBy(data, 'productPrice') });
            return data;
        }).catch((err) => {
            return err;
        });
};

module.exports = {
    salesRecord
}