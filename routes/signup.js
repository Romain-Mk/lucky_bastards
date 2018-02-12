var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var User = require('../models/user');

router.route('/')

  .get(function(req, res, next) {
    res.render('signup');
  })

  .post(function(req, res, next) {

    bcrypt.hash(req.body.password, 10, function(err, hash) {

      var newUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: hash
      });

      newUser.save(function (error, user) {
        if (error) throw (error);
        res.redirect('/');
      });

    });

  });

module.exports = router;
