
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shortlydb');
var db = mongoose.connection;
module.exorts = db;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected');
});



