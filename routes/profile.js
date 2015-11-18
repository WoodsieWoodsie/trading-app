'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res) {
  res.render('profile');
});

module.exports = router;