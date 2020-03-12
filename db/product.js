const _ = require('lodash')
const { readWhere } = require('./crud'); 
const salesRecord = (data)=>{
    
    console.log(data);
    return readWhere('transactions',{transactionType:'Sales'})
    .then((result)=>{
        return Promise.all([result,readWhere('transactionDetails',data)]);
    })
    .then((result)=>{
        data = [];
        result[0].forEach(elementOuter => {
            result[1].forEach(elementInner => {
                if(elementOuter.id === elementInner.transactionId){
                    var record = {
                        'transactionInnerId':elementInner.transactionId,
                        'transactionOuterId':elementOuter.id,
                        'transactionType':elementOuter.transactionType,
                        'productId':elementInner.productId,
                        'productPrice':elementInner.amount
                    }
                    data.push(record);
                }
                
            });
        });
        //console.log(result);
        data.push({"totalSales": _.sumBy(data,'productPrice')});
        return data;
    }).catch((err)=>{
        console.log(err);
        return err;
        
    });
};

module.exports={
    salesRecord
}