//database control function
var User = require("./Userschema.js");


//get all data

function handleError(err){
    console.log("Error:" + err);
    res.send('Err'+err)
}

function findall(res) {
    User.find((err,users)=>{
        if(err) handleError(err);
        res.json(users)
    });
}

function find(id,res){
    User.findById(id,(err,user)=>{
        if(err) handleError(err);
        res.json(user);
    })
}

//insert data
function insert (data,res){
    var user = new User({
        fname : data.fname,                
        lname: data.lname,
        pwd: data.pwd,                           
        age: data.age,                               
        sex: data.sex,
    });
    user.save(function (err, result) {
        if (err) handleError(err);
        else {
            res.sendStatus(666)
        }
    });
}

//updated user by id
function update(id, data, res){
    console.log(id)
    console.log(data)

    User.findByIdAndUpdate(id,{
        fname:data.fname,
        lname:data.lname,
        pwd:data.pwd,
        age:data.age,
        sex:data.sex
    },(err,user)=>{
        if (err) handleError(err);
        if (!user){res.sendStatus(999)}
        else{ res.sendStatus(666) }
    })
}


//delete user and check if successful deleted
function del(id, res){
    User.findByIdAndDelete(id,(err)=>{
        if (err) handleError(err);
    })
    User.findById(id,(err,user)=>{
        if (err) throw err;
        if (!user) res.sendStatus(666);
        else res.sendStatus(555);
    })
}



module.exports = {
    find,     //find one
    findall,  //find all
    insert,   //insert
    update,   //update
    del,      //delete
    // test,
    // findasyn,
    // findpromise,

}


