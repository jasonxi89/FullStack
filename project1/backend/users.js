var express = require('express');
var router = express.Router();

var func = require("./mongodb/func.js");
var User = require("./mongodb/Userschema.js");
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });
  

router.get('/',(req,res)=>{
    func.findall(res)
})

router.post('/',(req,res)=>{
    func.insert(req.body, res)
})

router.get('/:id',(req,res)=>{
    func.find(req.params.id,res)
})

router.put('/:id',(req,res)=>{
    func.update(req.params.id, req.body, res)
})

router.delete('/:id',(req,res)=>{
    func.del(req.params.id,res)
})



module.exports = router;