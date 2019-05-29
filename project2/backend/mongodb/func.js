//database control function
var User = require("./Userschema.js");
var express = require('express');
var bodyParser = require('body-parser');

//get all data

function handleError(err, res){
    console.log("Error:" + err);
    // res.json('Err'+err)
}

function findall(res) {
    User.find((err,users)=>{
        if(err) handleError(err, res);
        res.json(users)
    });
}

function find(id,res){
    console.log("Getting Detail")
    User.findById(id,(err,user)=>{
        if(err) handleError(err, res);
        res.json(user);
    })
}

//insert data
function insert (data,res){
    var user = new User({
        name : data.name,                    
        title : data.title,
        sdate: data.sdate,                     
        ophone: data.ophone,                      
        cphone: data.cphone,
        sms: data.sms,
        email: data.email,
        managerid: data.managerid,
    });
    console.log("hello ")
    user.save(function (err, result) {
        if (err) handleError(err, res);
        else {
            res.sendStatus(200)
        }
    });
}


//updated user by id
function update(id,data,res){
    User.findById(id).then((user)=>{
        if(data.pwd != user.pwd){
            res.sendStatus(403)
        }else{

            User.findByIdAndUpdate(id,{
                fname:data.fname,
                lname:data.lname,
                pwd:data.pwd,
                age:data.age,
                sex:data.sex
            },(err,user)=>{
                if (err) handleError(err, res);
                if (!user){res.sendStatus(999)}
                else{ res.sendStatus(200) }
            })
        }
    })}
    // User.findByIdAndUpdate(id,{
    //     fname:data.fname,
    //     lname:data.lname,
    //     pwd:data.pwd,
    //     age:data.age,
    //     sex:data.sex
    // },(err,user)=>{
    //     if (err) handleError(err, res);
    //     if (!user){res.sendStatus(999)}
    //     else{ res.sendStatus(200) }
    // })}
    




//delete user and check if successful deleted
function del(id, res){
    User.findByIdAndDelete(id,(err)=>{
        if (err) handleError(err, res);
        res.sendStatus(200)
    })
    // User.findById(id,(err,user)=>{
    //     if (err) throw err;
    //     if (!user) res.sendStatus(200);
    //     else res.sendStatus(555);
    // })
}



module.exports = {
    // find,     //find one
    // findall,  //find all
    insert,   //insert
    // update,   //update
    // del,      //delete
    // test,
    // findasyn,
    // findpromise,

}


