//database schema
var mongoose = require('./dbsetting.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({          
    name : { type: String ,required: true},                    
    title : { type: String ,required: true},
    sex : {type:String, required: true},
    sdate: {type: String ,required: true},                        
    ophone: {type: Number ,required: true},                        
    cphone: {type: Number ,required: true },
    sms: {type: Number ,required: true },
    email: {type: String ,required: true },
    uploadedFileCloudinaryUrl:{type: String },
    managerid: {type: String}
});

var autoPopulateManagerId = function(next) {
    this.populate('managerid');
    next();
};


UserSchema
.pre('findOne',autoPopulateManagerId)
.pre('find',autoPopulateManagerId)

  
module.exports = mongoose.model('User',UserSchema);
