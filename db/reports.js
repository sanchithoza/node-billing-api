const { readWhere, getFields } = require('./crud');

var getTransactionsByFilters = (table, filter) => {
    
    let startDate,endDate;
    
    if(filter.startDate && filter.endDate){
        startDate = filter.startDate;
        endDate = filter.endDate;
        delete filter.startDate;
        delete filter.endDate;
    }
    return readWhere(table, filter).then((result) =>{
        if(startDate && endDate){
            var data = result.filter(function(element){
                return checkDate(element,{startDate,endDate});
            });
            return getPersonName(data);
        }else{
            return getPersonName(result);
        }
    }) 
    .then((result)=> getUserName(result))
    .then((result)=> result)
    .catch((err) => err);
};
var checkDate = (item,filter)=>{
    if(item.transactionDate > new Date(filter.startDate) && item.transactionDate < new Date(filter.endDate)){
        return true;
    }else{
        return false;
    }
}
var getPersonName = async(data)=>{
    for(let i = 0;i < data.length;i++){
        await getFields('persons',['name'],{id:data[i].personId}).then((result)=>{
            data[i].personName = result[0].name;
        }).catch((err)=>err);
    }
    return data;
};
var getUserName = async(data)=>{
    for(let i = 0;i < data.length;i++){
        await getFields('users',['fullName'],{id:data[i].userId}).then((result)=>{
            data[i].userName = result[0].fullName;
        }).catch((err)=>err);
    }
    return data;
};

module.exports = {
    getTransactionsByFilters
};