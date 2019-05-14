// var express = require('express');

// var router = express.Router();

// const bodyParser = require('body-parser');

// router.use(bodyParser.json());


var func = require('./mongodb/func')

// router.get('/',(req,res)=>{
//     func.findall().then((data)=>console.log(data))
// })

console.log(func.test("er"))

func.findall().then((data)=>{console.log("hello")}).catch((error) => {
    console.log(error);})