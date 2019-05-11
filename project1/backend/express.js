
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use((req,res)=>{
    console.log(req.method)

    res.send(req.body)
})
app.listen(8888,()=>console.log('i am listenning 8888'))