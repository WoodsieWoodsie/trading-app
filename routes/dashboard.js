'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require('../models/item');

router.put('/', function(req, res) {
  var itemId = req.body.id;
  Item.changeAvailable(itemId, function(err, item) {
    res.status(err? 400 : 200).send(err || null);
  });
});

router.get('/getUsername/:userId', function(req, res) {
  User.getUsername(req.params.userId, function(err, username) {
    res.status(err? 400 : 200).send(err || username);
  });
});

router.get('/getAllItems', function(req, res) {
  Item.getAllItems(function(err, items){
    res.status(err? 400 : 200).send(err || items);
  });
});

router.get('/', function(req, res) {
  res.render('dashboard');
});

router.get('/:_id', function(req, res) {
  var userId = req.params._id;
  Item.loadUserItems(userId, function(err, items) {
    res.status(err ? 400 : 200).send(err || items);
  });
});

router.post('/', function(req, res) {
  Item.addItem(req.body, function(err, savedItem) {
    res.status(err ? 400 : 200).send(err || savedItem);
  });
});

router.delete('/deleteItem/:id', function(req, res) {
  console.log('we are in the back end');
  Item.deleteItem(req.params.id, function(err) {
    res.status(err ? 400 :200).send(err || null);
  });
});


module.exports = router;