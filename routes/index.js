'use strict';

var express = require('express');
var jwt = require('jwt-simple');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index');
});

router.post('/register', function(req, res){
  


});


module.exports = router;