'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var Schema = mongoose.Schema;

var User;

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
  var secret = process.env.JWT_SECRET;
  var token = jwt.encode(payload, secret);
  console.log('token: ', token);
  return token;
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
          cb(err, savedUser);
        });
      });
    });
  });
};

User = mongoose.model('User', userSchema);

module.exports = User;
