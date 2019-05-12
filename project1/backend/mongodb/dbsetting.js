//connect info

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connection;
mongoose.connect('mongodb+srv://admin:123456abc@app-kkliq.mongodb.net/project1?retryWrites=true');

module.exports = mongoose;

