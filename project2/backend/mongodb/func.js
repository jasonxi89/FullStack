//database control function
var User = require("./Userschema.js");
var express = require('express');
var bodyParser = require('body-parser');



//get all data

function handleError(err, res){
    // console.log("Error:" + err);
    // res.json('Err'+err)
}


//finished
function findall(page,res) {
    User.find({})
    .skip(page * 17)
    .limit(17)
    .sort({'_id':-1})
    .exec((err,users)=>{
        // console.log(users)
        if(err) handleError(err, res);
        res.json(users)
    });
}


function find(id,res){
    // console.log("Getting Detail")
    User.findById(id,(err,user)=>{
        if(err) handleError(err, res);
        res.json(user);
    })
}

function findDrnum(id,res){
    // console.log("Getting Detail")
    User.find({managerid:id},(err,user)=>{
        if(err) handleError(err, res);
        res.json(user);
    })
}
function findDr(id,res){
    // console.log("Finding Directors")
    User.find({managerid:`${id}`},(err,result)=>{
        res.json(result.length)
    })
}

//finished
function insert (data,res){
    if(data.managerid){
        var user = new User({
            name : data.name,                    
            title : data.title,
            sex: data.sex,
            sdate: data.sdate,                     
            ophone: data.ophone,                      
            cphone: data.cphone,
            sms: data.sms,
            email: data.email,
            uploadedFileCloudinaryUrl: data.uploadedFileCloudinaryUrl,
            managerid: data.managerid,
        });
    }else{
        var user = new User({
            name : data.name,                    
            title : data.title,
            sex: data.sex,
            sdate: data.sdate,                     
            ophone: data.ophone,                      
            cphone: data.cphone,
            sms: data.sms,
            email: data.email,
            uploadedFileCloudinaryUrl: data.uploadedFileCloudinaryUrl,
        });
    }

    user.save(function (err, result) {
        if (err) handleError(err, res);
        else {
            res.sendStatus(200)
        }
    });
}


function validmanager(id,res){
    if(!id){
        User.find({}, function(err, users) {
            var userMap = {};
            // console.log(users)
            users.forEach(function(user) {
              userMap[user._id] = user.name;
            });
            res.send(userMap);  

          });
    }else{
        User.find({}, function(err, users) {
            var userMap = {};
            users.forEach(function(user) {
                if(user._id == id) {return;};
                if(!user.managerid){
                    userMap[user._id] = user.name;
                }
                else{
                    let tempuser = user;
                    let isvalid = true;
                    while(tempuser.managerid){
                        if(tempuser.managerid._id ==id){
                            isvalid = false;
                            break;
                        }else{
                            tempuser = tempuser.managerid;
                        }
                    }
                    if(isvalid){
                        userMap[user._id] = user.name
                    }
                }
            });
            res.send(userMap);  
        });
    }
}


//updated user by id
function update(id,data,res){
        if(data.managerid){
            console.log(data.managerid)
            console.log("excited")
            User.findByIdAndUpdate(id,{
                name:data.name,
                title:data.title,
                sdate:data.sdate,
                sex:data.sex,
                ophone:data.ophone,
                cphone:data.cphone,
                sms:data.sms,
                email:data.email,
                uploadedFileCloudinaryUrl:data.uploadedFileCloudinaryUrl,
                managerid:data.managerid
            },(err,user)=>{
                if (err) handleError(err, res);
                if (!user){res.sendStatus(999)}
                else{ res.sendStatus(200) }
    })}else{
            console.log(data.managerid)
            console.log("not excited")
            User.findByIdAndUpdate(id,{
                name:data.name,
                title:data.title,
                sdate:data.sdate,
                sex:data.sex,
                ophone:data.ophone,
                cphone:data.cphone,
                sms:data.sms,
                email:data.email,
                uploadedFileCloudinaryUrl:data.uploadedFileCloudinaryUrl,
            },{ new: true, overwrite: true },(err,user)=>{
                if (err) handleError(err, res);
                if (!user){res.sendStatus(999)}
                else{ res.sendStatus(200)}
    })}
}
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
async function del(id, res){
    var temp;
    await User.findById(id,(err,user)=>{
            temp = user.managerid?user.managerid.id:""
            // console.log(user.managerid)
            // User.updateMany({managerid:id},{managerid:user.managerid},
            //     (err,doc)=>
            //     {console.log("finished")
            //     })}
       
            // User.updateMany({managerid:id},{$unset:{'managerid':''}},false, true)
            //     }
            if(temp){
                User.updateMany({managerid:id},{managerid:temp},
                    (err,doc)=>
                    {User.findByIdAndDelete(id,(err)=>{
                        if (err) handleError(err, res);
                        res.sendStatus(200)
                    })
                    })
            }else{
                User.updateMany({managerid:id},{$unset:{managerid:''}},(err,doc)=>{
                    User.findByIdAndDelete(id,(err)=>{
                        if (err) handleError(err, res);
                        res.sendStatus(200)
                    })
            })
             }
        })
}



module.exports = {
    find,     //find one
    findall,  //find all
    insert,   //insert
    validmanager, //find valid manager
    findDr, //find number of dr.
    findDrnum, //find Dr Num
    update,   //update
    del,      //delete
    // test,
    // findasyn,
    // findpromise,

}


