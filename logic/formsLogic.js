/**
 * Created by pariskshitdutt on 25/02/16.
 */
var q=require('q')
var db=require('../db/DbSchema');
var config=require('config');
var log = require('tracer').colorConsole(config.get('log'));
var userTable=db.getuserdef;

var forms={
    postContactUs:function(req,res) {
        var def= q.defer();
        var user = new userTable(req.body);
        user.save(function (err, user, info) {
            if (!err) {
                log.info("new user added");
                def.resolve();
            }else{
                log.warn(err);
                def.reject({status:500,message:config.get('error.internalservererror')});
            }
        });
        return def.promise;
    },
    postSubscribe:function(req,res){
        var def= q.defer();
        var user = new userTable(req.body);
        user.save(function (err, user, info) {
            if (!err) {
                log.info("new subscribe user added");
                def.resolve();
            }else{
                log.warn(err);
                def.reject({status:500,message:config.get('error.internalservererror')});
            }
        });
        return def.promise;
    }

};

module.exports=forms;