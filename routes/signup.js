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
  timestamp: Date,
  admin: Boolean
});
var userModel = mongoose.model('users', userSchema);

router.post('/signup', function(req, res, next) {

  userModel.find(
      { email: req.body.email } ,
      function (err, users) {
        if(users.length == 0) {

        var newUser = new userModel ({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password
        });
        newUser.save(
          function (error, user) {
            req.session.user = user;
          }
        );
      } else {
        res.render('signup');
      }
    }
  );
});
