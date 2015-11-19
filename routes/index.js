'use strict';

var express = require('express');
var jwt = require('jwt-simple');
var User = require('../models/user');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index');
});

router.post('/register', function(req, res){
  User.register(req.body, function(err, _id) {
    res.status(err ? 400 : 200).send(err || _id);
  });
});

router.post('/login', function(req, res) {
  User.login(req.body, function(err, user) {
    res.status(err ? 400 : 200).send(err || user);
  });
});


module.exports = router;