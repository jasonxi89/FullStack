var users = require('./users');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Irigin")
// })

app.use('/api/users',users)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });
  
app.listen(8888,()=>console.log('i am listenning 8888'))

