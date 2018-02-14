var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  picture: {type:String, default: null},
  coverpicture: {type:String, default: null},
  fb: {type:String, default: null},
  insta: {type:String, default: null},
  twitter: {type:String, default: null},
  blog: {type:String, default: null},
  about: String,
  admin: Boolean
}, {timestamps: true});

module.exports = mongoose.model('users', userSchema);
