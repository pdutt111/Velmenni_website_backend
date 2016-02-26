/**
 * Created by pariskshitdutt on 09/06/15.
 */
var mongoose = require('mongoose');
//var mockgoose=require('mockgoose');
var config = require('config');
var events = require('../events');
var log = require('tracer').colorConsole(config.get('log'));
var ObjectId = require('mongoose').Types.ObjectId;
var validate = require('mongoose-validator');
var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between 3 and 50 characters'
    })
];
var emailValidator=[
    validate({
        validator: 'isEmail',
        message: "not a valid email"
    })
];
var phoneValidator = [
    validate({
        validator: 'isLength',
        arguments: [10, 10],
        message: 'phonenumber should be 10 digits'
    })
];
var db=mongoose.createConnection(config.get('mongo.location'),config.get('mongo.database'));
var userdef;
var videodef;
var Schema = mongoose.Schema;
mongoose.set('debug', config.get('mongo.debug'));
/**
 * user schema stores the user data the password is hashed
 * @type {Schema}
 */
var userSchema=new Schema({
    email:{type:String,validate:emailValidator},
    phonenumber:{type:String,validate:phoneValidator},
    name:{type:String},
    device:{service:String,reg_id:String,active:{type:Boolean,default:true}},
    profession:{type:String},
    message:String,
    address:{type:String},
    source:String,
    created_time:{type:Date,default:Date.now},
    modified_time:{type:Date,default:Date.now}
});
var videoSchema=new Schema({
    name:{type:String,unique:true,dropDups:true},
    description:String,
    views:{type:Number,default:0},
    link:String,
    active:{type:Boolean,default:true},
    created_time:{type:Date,default:Date.now},
    modified_time:{type:Date,default:Date.now}
});
db.on('error', function(err){
    log.info(err);
});
/**
 * once the connection is opened then the definitions of tables are exported and an event is raised
 * which is recieved in other files which read the definitions only when the event is received
 */
    userdef=db.model('user',userSchema);
    videodef=db.model('videos',videoSchema);
    exports.getuserdef= userdef;
    exports.getvideodef= videodef;
    events.emitter.emit("db_data");

