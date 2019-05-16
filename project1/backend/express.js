var users = require('./users');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use('/api/users',users)

app.listen(8888,()=>console.log('i am listenning 8888'))

