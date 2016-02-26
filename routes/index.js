var params = require('parameters-middleware');
var express = require('express');
var router = express.Router();
var config=require('config');
var log = require('tracer').colorConsole(config.get('log'));
var counter=require('../logic/counterLogic');
/* GET home page. */
router.post('/counter', params({body:['id']},{message : config.get('error.badrequest')}),
    function(req, res, next) {
    counter.postCounter(req,res)
        .then(function(){
            res.json(config.get('ok'));
        })
        .catch(function(err){
            res.status(err.status).json(err.message);
        }).done();
});

router.get('/counter', params({query:['id']},{message : config.get('error.badrequest')}),
    function(req, res, next) {
    counter.getCounter(req,res)
        .then(function(video){
            res.json(video);
        })
        .catch(function(err){
            res.status(err.status).json(err.message);
        }).done();
});
router.post('/video', params({body:['name','description']},{message : config.get('error.badrequest')}),
    function(req, res, next) {
    counter.addVideo(req,res)
        .then(function(video){
            res.json(video);
        })
        .catch(function(err){
            res.status(err.status).json(err.message);
        }).done();
});
router.get('/videos',
    function(req, res, next) {
        counter.getVideos(req,res)
            .then(function(videos){
                res.json(videos);
            })
            .catch(function(err){
                res.status(err.status).json(err.message);
            }).done();
    });
router.get('/video', params({body:['id']},{message : config.get('error.badrequest')}),
    function(req, res, next) {
        counter.getVideo(req,res)
            .then(function(videos){
                res.json(videos);
            })
            .catch(function(err){
                res.status(err.status).json(err.message);
            }).done();
    });


module.exports = router;
