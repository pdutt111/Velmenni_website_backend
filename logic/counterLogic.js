/**
 * Created by pariskshitdutt on 25/02/16.
 */
var q=require('q')
var db=require('../db/DbSchema');
var config=require('config');
var ObjectId = require('mongoose').Types.ObjectId;
var log = require('tracer').colorConsole(config.get('log'));
var videoTable=db.getvideodef;

var counter={
    postCounter:function(req,res) {
        var def= q.defer();
        videoTable.update({_id:req.body.id},{$inc:{views:1}},function(err,info){
           if(!err){
               def.resolve();
           } else{
               log.warn(err);
               def.reject({status:500,message:config.get('error.internalservererror')});
           }
        });
        return def.promise;
    },
    getCounter:function(req,res) {
        var def= q.defer();
        videoTable.findOne({_id:new ObjectId(req.query.id)},"views",function(err,video){
            if(!err){
                def.resolve(video);
            } else{
                log.warn(err);
                def.reject({status:500,message:config.get('error.internalservererror')});
            }
        });
        return def.promise;
    },
    addVideo:function(req,res) {
        var def= q.defer();
        log.info(req.body);
        var video=new videoTable(req.body);
        video.save(function(err,video,info){
            if(!err){
                def.resolve(video);
            }else{
                log.warn(err);
                def.reject({status:500,message:config.get('error.internalservererror')});
            }
        });
        return def.promise;
    },
    getVideos:function(req,res){
        var def= q.defer();
        videoTable.find({active:true},function(err,rows){
            if(!err){
                def.resolve(rows);
            }else{
                log.warn(err);
                def.reject({status:500,message:config.get('error.internalservererror')});
            }
        });
        return def.promise;
    },
    getVideo:function(req,res){
        var def= q.defer();
        videoTable.findOne({_id:new ObjectId(req.body.id)},function(err,video){
            if(!err){
                def.resolve(video);
            }else{
                log.warn(err);
                def.reject({status:500,message:config.get('error.internalservererror')});
            }
        });
        return def.promise;
    }

};

module.exports=counter;