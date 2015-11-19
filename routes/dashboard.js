'use strict';

var express = require('express');
var router = express.Router();
var authUser = require('../config/auth')
var User = require('../models/user');


router.get('/:token', function(req, res) {
  console.log("req.params.token: ", req.params.token);
  authUser(req.params.token);
  res.render('dashboard');
});

module.exports = router;