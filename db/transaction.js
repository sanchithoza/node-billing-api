const knex = require('./knex.js');
const {read,readWhere,insert} = require('./crud');
const addNewTransaction = (table,data)=>{
    var transaction = data[0];
    var transactionDetail = data[1];
    //adding common detail of transaction to transactions table
   return Promise.all([insert(table,transaction),transactionDetail])
    .then((result)=>{
        result[1].detail.forEach(element => {
            element.transactionId = result[0][0].id;
        });
        //adding productwise detail of transation to transactionDetails table
        return Promise.all([result[0][0],insert('transactionDetails',result[1].detail)])
    })
    .then((result)=>{
        return result;
    }).catch((err)=>{
        return err;
    });
};
const readTransactionDetail = (table,id)=>{
    return read(table,id)
    .then((result)=>{
       //getting person name and adding to result array
       return Promise.all([read('persons',result[0].personId),result])
    })
       .then(([res,result])=>{
           result[0].person = res[0].name;
        //getting username and adding to result array
        return Promise.all([read('users',result[0].userId),result])
       })
       .then(([res,result])=>{
           result[0].user = res[0].fullName;
        //getiinf transaction details and adding to result array
       return Promise.all([readWhere('transactionDetails',{transactionId:result[0].id}),result])
       })
        .then(([detail,result])=>{
            result[0]['detail'] = detail;
        //getting product name for each product in productDetails result adding to array
        return getProductName(result[0])
        })
        .then((data)=>{  
            data.totalTax = 0;
            data.netAmount = 0;
            data.grossAmount = 0;
            data.detail.forEach(element => {
                element.totalPrice = element.price;
            if(element.igstRate){
                element.igstAmt = element.price * (element.igstRate / 100);
                data.totalTax +=element.igstAmt;
                element.totalPrice += element.igstAmt;  
            }else{
                element.cgstAmt = element.price * (element.cgstRate / 100);
                data.totalTax +=element.cgstAmt;
                element.totalPrice += element.cgstAmt;
                element.sgstAmt = element.price * (element.sgstRate / 100);
                data.totalTax +=element.sgstAmt;
                element.totalPrice += element.sgstAmt;
            }
            data.netAmount += element.price;     
            data.grossAmount += element.totalPrice;     
          });
         return data;
        })

    };
async function getProductName(data){
    
     for(var i=0;i<data.detail.length;i++){
        //fetch product name 
        await read('products',data.detail[i].productId).then((res)=>{
             data.detail[i].product = res[0].productName;
          });
     };
     return data;
}


module.exports={
    readTransactionDetail,
    addNewTransaction
}