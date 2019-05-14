//import db function
var func = require('./mongodb/func')

//server setting
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


// app.use((req,res)=>{
//     console.log(req.method)

//     res.send(req.body)
// })

app.get('/users/:userId', (req, res) => {
    let info = func.findpromise(req.param.userId).then(res=>{return res});
    console.log(info)
    // res.send(res.json(func.findpromise(req.param.userId)))
    // function getUserdata(){
    //     return new Promise((resolve,rejct)=>{
    //         var data = func.find(req.params.userId);
    //         resolve(data);
    //         rejct(new Error("GG si mi da"))
    //     })
    // }

    // var getUserdata  = new Promise(function(resolve,reject){
    //     console.log(req.params.userId)
    //     let data = func.find(req.params.userId)
    //     resolve(data)
    // })

    // getUserdata.then(
    //     (value) => {
    //         console.log(typeof value);
    //         console.log("hello world")   
    //     }
    // )

    // res.send(func.find(req.params.userId)));
  });

//server listen 8888
app.listen(8888,()=>console.log('i am listenning 8888'))

