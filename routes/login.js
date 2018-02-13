var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var User = require('../models/user');

var from = null;

router.route('/')
  .get(function(req, res, next) {
    res.render('login', {from});
  })
  .post(function(req, res, next) {
    login(req, res, next);
  });

router.route('/:from')
  .get(function(req, res, next) {
    res.render('login', {from: req.params.from});
  })
  .post(function(req, res, next) {
    login(req, res, next);
  });

function login(req, res, next) {

  var email = req.body.email;
  var password = req.body.password;

  User.find({ email: email }, function(err, user) {
    if (err) throw err;

    // Check if user is defined and has at least one element
    if (typeof user !== 'undefined' && user.length > 0) {

      bcrypt.compare(password, user[0].password, function(err, match) {

        if (err) throw(err);

        if (match === true) {
          // password matches
          req.session.userId = user[0]._id;

          if (req.params.from === 'addbutton') {
            res.redirect('/admin/newstory');
          } else {
            res.redirect('/');
          }

        } else if (match === false) {
          // password does not match
          res.render('login', {from: req.params.from});
        }

      });

    } else {
      res.render('login', {from});
    }

  });

}

module.exports = router;
