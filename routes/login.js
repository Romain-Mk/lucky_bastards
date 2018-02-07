var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.route('/')

  .get(function(req, res, next) {
    res.render('login');
  })

  .post(function(req, res, next) {

    var email = req.body.email;
    var password = req.body.password;

    User.find({ email: email }, function(err, user) {
      if (err) throw err;

      // Check if user is defined and has at least one element
      if (typeof user !== 'undefined' && user.length > 0) {

        if (password === user[0].password) {
          console.log("User connected!");
          res.redirect('/');
        } else {
          console.log("Email or password error");
          res.render('login');
        }

      } else {
        console.log('User not exist');
        res.render('login');
      }

    });

  });

module.exports = router;
