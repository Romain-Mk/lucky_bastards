var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  picture: {type:String, default: null},
  facebook: {type:String, default: null},
  instagram: {type:String, default: null},
  twitter: {type:String, default: null},
  website: {type:String, default: null},
  admin: Boolean
}, {timestamps: true});

module.exports = mongoose.model('users', userSchema);
