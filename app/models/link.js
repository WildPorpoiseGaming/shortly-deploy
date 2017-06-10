var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var urlsSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  link: String
});

var Link = mongoose.model('Link', urlsSchema);

var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

Link.prototype.link = function() {
  // console.log(this.url);
  var code = createSha(this.url);
  return this.code = code;
};

module.exports = Link;
