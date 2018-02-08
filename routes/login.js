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
          /*
            on entre dans le tableau user (un seul tableau puisqu'on a validé par l'email
            et on lui demande de nous envoyer l'objet
            en position 0 => il ne peut y en avoir qu'un seul)
          */
          req.session.userId = user[0]._id;
          res.redirect('/');
        } else {
          res.render('login');
        }

      } else {
        res.render('login');
      }

    });

  });

module.exports = router;
