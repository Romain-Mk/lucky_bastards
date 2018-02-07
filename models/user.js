var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  picture: String,
  url: Array,
  about: String,
  admin: Boolean
}, {timestamps: true});

module.exports = mongoose.model('users', userSchema);
