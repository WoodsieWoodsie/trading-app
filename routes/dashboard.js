'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require('../models/item');


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

router.delete('/deleteItem/:id', function(req, res) {
  console.log('rb  ', req.body.id);
  Item.deleteItem(req.body.id, function(err) {
    res.status(err ? 400 :200).send(err || '');
  });

});

});
module.exports = router;