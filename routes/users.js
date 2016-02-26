var params = require('parameters-middleware');
var express = require('express');
var events = require('../events');
var router = express.Router();
var config=require('config');
var log = require('tracer').colorConsole(config.get('log'));
var formLogic=require('../logic/formsLogic');
/* GET users listing. */
router.post('/contact-us',params({body:['name','email','phonenumber','message']},{message : config.get('error.badrequest')}),
    function(req, res, next) {
        req.body.source="contact-us";
  formLogic.postContactUs(req,res)
      .then(function(){
        res.json(config.get('ok'));
          events.emitter.emit('mail',{to:"deepak@velmenni.com shivam@velmenni.com pariskshit@velmenni.com",subject:req.body.source+" new user",text:JSON.stringify(req.body)});
      })
      .catch(function(err){
        res.status(err.status).json(err.message);
      }).done();
});

router.post('/subscribe', params({body:['email']},{message : config.get('error.badrequest')}),
    function(req, res, next) {
        req.body.source="subscribe";
  formLogic.postSubscribe(req,res)
      .then(function(){
          res.json(config.get('ok'));
          events.emitter.emit('mail',{to:"deepak@velmenni.com shivam@velmenni.com pariskshit@velmenni.com",subject:req.body.source+" new user",text:JSON.stringify(req.body)});
      })
      .catch(function(err){
        res.status(err.status).json(err.message);
      }).done();
});

module.exports = router;
