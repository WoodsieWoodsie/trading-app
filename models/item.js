'use strict';

var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var Schema = mongoose.Schema;

var Item;

var itemSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  available: { type: Boolean, default: true },
  owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  timeCreated: { type: Date, default: new Date() }
});

itemSchema.statics.loadUserItems = function(userId, cb) {
  Item.find( { owner: userId }, function(err, items) {
    if(err || !items) return cb(err || 'No items found.');
    cb(err, items);

  });
};

itemSchema.statics.addItem = function(item, cb) {
  var newItem = new Item();
  newItem.name = item.name;
  newItem.description = item.description;
  newItem.owner = item.owner;
  newItem.timeCreated = Date.now();
  newItem.save(function(err, savedItem) {
    cb(err, savedItem);
  });
};

Item = mongoose.model('Item', itemSchema);

module.exports = Item;