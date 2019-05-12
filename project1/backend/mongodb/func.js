//database control function
var User = require("./Userschema.js");

//get all data
function findall() {
    User.find({}, function(err, users) {
        if (err) throw err
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


function update(id){

    // User.findById("5cd88b3423a67b1eb45c195e",(err,user)=>{
    //     if(err) throw err;
    //     console.log(user)
    // })
    User.findByIdAndUpdate(id,)
}

function del(id){
    User.findByIdAndDelete(id,function(err){
        if (err) throw err;

        console.log('User Deleted')
    })
}
module.exports = {
    findall,
    insert,
    update,
    del
}

// del("5cd88b3423a67b1eb45c195e")
User.findById("5cd88b3423a67b1eb45c195e",(err,user)=>{
    if (err) throw err;
    if (!user) console.log("nothing find")
    else console.log(user)
})
