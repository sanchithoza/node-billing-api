var {client} = require('./db-connect');

const getUsers = (req,res)=>{
    
    client.query("select * from users",(err,result)=>{
        if(err){
            throw err;
        }
        res.status(200).send(result.rows);
    });
};
const getUserById = (req,res)=>{
    getUserDetails(req.params.id).then((row)=>{
        res.status(200).send(row);
    }).catch((err) => {
        res.status(400).send('no record Found with given id');
    });
};
const createUser = (req,res)=>{
    client.query("INSERT INTO users(name, password, role)VALUES ($1, $2, $3);",[req.body.name,req.body.password,req.body.role],(err,result)=>{
        if(err){
            throw err;
        }
        res.status(200).send(`user added with id ${result.id}`);
    });
};
const updateUser = (req,res)=>{
    getUserDetails(req.params.id).then((rows)=>{      
        var name = req.body.name || rows[0].name;
        var password = req.body.password || rows[0].password;
        var role = req.body.role || rows[0].role;
       
        
        client.query("UPDATE users SET name=$1, password=$2, role=$3 WHERE id = $4;",[name,password,role,req.params.id],(err,result)=>{
            if(err){
                throw err;
            }
            res.status(200).send(`updated user with id ${req.params.id}`);
        });
    }).catch((err) => {
        res.status(400).send('record not available',err);    
    });
};
const deleteUser = (req,res)=>{
    getUserDetails(req.params.id).then((row)=>{
        client.query("delete from users where id = $1",[req.params.id],(err,result)=>{
            if(err){
                throw err;
            }
            res.status(200).send(`Deleted user with id ${req.params.id}`);
        });
    }).catch((err) => {
        res.status(400).send('record not available');
    });
};

var getUserDetails = (id)=>{

    return new Promise((resolve,reject)=>{
        client.query("select * from users where id = $1",[id],(err,result)=>{
            if(err){
                reject(err);
            }
            if(result.rows.length > 0){
                resolve(result.rows);
            }else{
                reject();
            }
        });
    });
    
};

module.exports={
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}