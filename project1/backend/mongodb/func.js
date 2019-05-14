//database control function
var User = require("./Userschema.js");


//get all data
function findall() {
    // User.find({},(err,arr) =>{
    //     if (err) return handleError(err);
    //     if(arr) return arr;
    //   })
    User.find({}).then(function (users) {
        return users;
        });
}


//insert data
function insert (fname,lname,pwd,age,sex){
    var user = new User({
        fname : fname,                
        lname: lname,
        pwd: pwd,                           
        age: age,                               
        sex: sex,
    });
    user.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    });
}


// function findpromise(id){
//     return User.findById(id).then((res)=>{
//         return res;}
//     ).catch((error) => {
//         console.log(error);
//     })
// }


// //find user by id
// async function findasyn(id) {
//     return await User.findById(id,(err,user)=>{
//     if (err) return err;
//     if (user) {
//         return user;}
// })}


//updated user by id
function update(id,fname,lname,pwd,age,sex){
    User.findByIdAndUpdate(id,{
        fname:fname,
        lname:lname,
        pwd:pwd,
        age:age,
        sex:sex
    },(err,user)=>{
        if (err) throw err;
        if (!user) console.log("Some error happened. Please Refresh Page and Try again!")
        else{console.log("updated request submitted successful!")}
    })
}


//delete user and check if successful deleted
function del(id){
    User.findByIdAndDelete(id,(err)=>{
        if (err) throw err;
    })
    User.findById(id,(err,user)=>{
        if (err) throw err;
        if (!user) console.log("Successful Deleted")
        else console.log("Failed! Please Try Again")
    })
}

function test(id){
    return id
}

User.find((err,res)=>{
    console.log(res);
});

// module.exports = {
//     //find,     //find one
//     findall,  //find all
//     insert,   //insert
//     update,   //update
//     del,      //delete
//     test,
//     // findasyn,
//     // findpromise,

// }


