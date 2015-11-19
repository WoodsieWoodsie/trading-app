'use strict';

var express = require('express');
var jwt = require('jwt-simple');
var User = require('../models/user');
var router = express.Router();

router.get('/', function(req, res){
  res.render('profile');
});

module.exports = router;