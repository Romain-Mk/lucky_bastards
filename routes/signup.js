var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var User = require('../models/user');

var errors = null;

router.route('/')

  .get(function(req, res, next) {
    res.render('signup', {errors});
  })

  .post(function(req, res, next) {

    bcrypt.hash(req.body.password, 10, function(err, hash) {

      var newUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: hash
      });

      // Form validator
      req.checkBody({
        'username': {
          isLength: {
            errorMessage: 'Username must be at least 3 chars long',
            options: { min: 3 }
          }
        },
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
        res.render('signup', {errors});
      } else {
        newUser.save(function (error, user) {
          if (error) throw (error);
          res.redirect('/');
        });
      }

    });

  });

module.exports = router;
