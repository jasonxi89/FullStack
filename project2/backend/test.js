var func = require('./mongodb/func')
const bodyParser = require('body-parser');





id = "5cd88db5a29d131fb4abe3b9"

var data;

console.log(func.findasyn(id))
func.findasyn(id).then((res)=>{
    console.log(res)
})
// func.findasyn(id).then((res)=>{
//     console.log("hello");
//     console.log(JSON.parse(res));
// }).catch((error) => {
//     console.log(error);
// })

//这个能用
// func.findpromise(id).then((res)=>{
//     console.log(res)
// })


// let getUserdata  = new Promise(function(resolve,reject){
//     data = func.findasyn(id);
//     resolve(data);
// })

// getUserdata.then(
//     (value) => {
//         console.log(value);
//         console.log("hello world")   
//     }
// )

// console.log(func.findasyn(id).then(data=>console.log(data)))
// let getUserdata = func.findasyn(id);
// getUserdata.then((response)=>
// console.log(response))

// var promise1 = new Promise(function(resolve, reject) {
//     resolve('Success!');
//   });
  
//   promise1.then(function(value) {
//     console.log(value)
//   })