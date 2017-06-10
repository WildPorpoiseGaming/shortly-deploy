var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


var usersSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } }, 
  password: { type: String, required: true }
});


var User = mongoose.model('User', usersSchema);

User.comparePassword = function(candidatePassword, savedPassword, cb) {
  bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
    if (err) { return cb(err); }    
    cb(null, isMatch);
  }); 
};


User.prototype.cipher = function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      return this.password = hash;
      next();
    });
};


module.exports = User;
