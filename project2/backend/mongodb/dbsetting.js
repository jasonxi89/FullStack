//connect info

const mongoose = require('mongoose');
// var bluebird = require('bluebird');
// mongoose.Promise=bluebird;
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const db = mongoose.connection;

mongoose.connect('mongodb+srv://admin:123456abc@app-kkliq.mongodb.net/project2?retryWrites=true'), {useNewUrlParser: true};

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;

