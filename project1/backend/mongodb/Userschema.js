//database schema
var mongoose = require('./dbsetting.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({          
    fname : { type: String ,required: true},                    
    lname : { type: String ,required: true}, 
    pwd: {type: String ,required: true},                        
    age: {type: Number ,required: true},                        
    sex: {type:String ,required: true },
});

module.exports = mongoose.model('User',UserSchema);
