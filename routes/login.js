var express = require('express');
var router = express.Router();
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

var userModel = mongoose.model('users', userSchema);


router.route('/')
  .get(function(req, res, next) {
    res.render('login');
  })

  .post(function(req, res, next) {

    userModel.find (
      { email: req.body.email, password:req.body.password },
      function (err, users) {
      console.log(req.body)
      res.render('index');
    })

  });


module.exports = router;
