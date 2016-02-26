var params = require('parameters-middleware');
var express = require('express');
var router = express.Router();
var config=require('config');
var log = require('tracer').colorConsole(config.get('log'));
var counter=require('../logic/counterLogic');
/* GET home page. */
router.get('/',function(req,res){
    res.render('layout.ejs');
});
module.exports = router;
