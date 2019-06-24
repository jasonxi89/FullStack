//database schema
var mongoose = require('./dbsetting.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({          
    name : { type: String ,required: true},                    
    title : { type: String ,required: true},
    sex : {type:String, required: true},
    sdate: {type: String ,required: true},                        
    ophone: {type: String ,required: true},                        
    cphone: {type: String ,required: true },
    sms: {type: String ,required: true },
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

UserSchema.index({ name: 'text', title: 'text', sex: 'text', sdate: 'text', ophone: 'text', cphone: 'text' , sms: 'text', email: 'text' });
module.exports = mongoose.model('User',UserSchema);
