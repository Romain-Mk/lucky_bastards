var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var User = require('../models/user');

var errors = null;
var feedback = null;

router.route('/')

  .get(function(req, res, next) {
    res.render('login', {errors, feedback});
  })

  .post(function(req, res, next) {

    var email = req.body.email;
    var password = req.body.password;

    // Form validator
    req.checkBody({
      'email': {
        isEmail: {
          errorMessage: 'Invalid email address'
        }
      },
      'password': {
        isLength: {
          errorMessage: 'Password must be at least 3 chars long',
          options: { min: 3 }
        }
      }
    });

    errors = req.validationErrors();

    if (errors) {
      res.render('login', {errors, feedback});
    } else {

      User.findOne({ email: email }, function(err, user) {
        if (err) throw err;

        // Check if user is defined and has at least one element
        if (user) {

          bcrypt.compare(password, user.password, function(err, match) {

            if (err) throw(err);

            if (match === true) {
              // password matches
              req.session.userId = user._id;
              res.redirect('/');
            } else if (match === false) {
              // password does not match
              res.render('login', {errors, feedback: 'Invalid email or password'});
            }

          });

        } else {
          res.render('login', {errors, feedback: 'Invalid email or password'});
        }

      });

    }

  });

module.exports = router;
