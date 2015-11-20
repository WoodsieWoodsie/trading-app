'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var Schema = mongoose.Schema;

var User;

var secret = "ammarrachel";

var userSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

userSchema.methods.token = function() {
  var payload = {
    username: this.username,
    _id: this._id
  };

  // var secret = process.env.JWT_SECRET;
  var token = jwt.encode(payload, secret);
  console.log('token: ', token);
  return token;
};

userSchema.statics.login = function(user, cb) {
  User.findOne({username: user.username}, function(err, databaseUser) {
    if(err || !databaseUser) return cb(err || 'Incorrect username or password.');
    bcrypt.compare(user.password, databaseUser.password, function(err, isCorrect) {
      if(err || !isCorrect) return cb(err || 'Incorrect username or password');
      databaseUser.password = null;
      cb(null, databaseUser);
    });
  });
};

userSchema.statics.register = function(user, cb) {
  var username = user.username;
  var password = user.password;
  var name = user.name;
  var email = user.email;
  var phone = user.phone;
  User.findOne({username: user.username}, function(err, user) {
    if(err || user) return cb(err || 'Username already taken.');
    bcrypt.genSalt(10, function(err1, salt) {
      bcrypt.hash(password, salt, function(err2, hash) {
        if(err1 || err2) return cb(err1 || err2);
        var newUser = new User();
        newUser.username = username;
        newUser.password = hash;
        newUser.name = name;
        newUser.email = email;
        newUser.phone = phone;
        newUser.save(function(err, savedUser) {
          savedUser.password = null;
          cb(err, savedUser._id);
        });
      });
    });
  });
};

userSchema.statics.getUsername = function(userId, cb) {
  User.findOne( {_id: userId }, function(err, user) {
    if(err || !user) return cb(err || 'User not found.');
    cb(err, user.username);
  })

};

User = mongoose.model('User', userSchema);

module.exports = User;
