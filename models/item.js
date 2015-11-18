'use strict';

var mangoose = require('mangoose');
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

Item = mongooes.model('Item', itemSchema);

module.exports = Item;