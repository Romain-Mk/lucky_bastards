var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var User = require('../models/user');

var from = null;
var errors = null;
var feedback = null;

router.route('/')
  .get(function(req, res, next) {
    res.render('login', {from, errors, feedback});
  })
  .post(function(req, res, next) {
    login(req, res, next);
  });

router.route('/:from')
  .get(function(req, res, next) {
    res.render('login', {from: req.params.from, errors, feedback});
  })
  .post(function(req, res, next) {
    login(req, res, next);
  });

function login(req, res, next) {

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
    res.render('login', {from, errors, feedback});
  } else {

    User.find({ email: email }, function(err, user) {
      if (err) throw err;

      // Check if user is defined and has at least one element
      if (typeof user !== 'undefined' && user.length > 0) {

        bcrypt.compare(password, user[0].password, function(err, match) {

          if (err) throw(err);

          if (match === true) {
            // password matches
            req.session.userId = user[0]._id;
            req.session.userName = user[0].username;
            req.session.userPicture = user[0].picture;

            if (req.params.from === 'addbutton') {
              res.redirect('/admin/newstory');
            } else {
              res.redirect('/');
            }

          } else if (match === false) {
            // password does not match
            res.render('login', {from: req.params.from, errors, feedback: 'Invalid email or password'});
          }

        });

      } else {
        res.render('login', {from: req.params.from, errors, feedback: 'Invalid email or password'});
      }

    });

  }

}

module.exports = router;
