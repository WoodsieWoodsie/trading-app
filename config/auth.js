'use strict';

var User = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function(token) {
  try {
    var payload = jwt.decode(token, secret);
  }
  catch(err) {
    return 'Authentication required.';
  }

  var userId = payload._id;

  User.findById(userId, function(err, user) {
    if(err || !user) return err || 'Authentication required.';
    return user._id;
  });

};