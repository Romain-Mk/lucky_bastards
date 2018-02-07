var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.route('/')

  .get(function(req, res, next) {
    res.render('signup');
  })

  .post(function(req, res, next) {

    var newUser = new User ({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    newUser.save(function (error, user) {
      if (error) throw (error);
      res.redirect('/');
    });

  });

module.exports = router;
