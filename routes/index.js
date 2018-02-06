var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


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


router.get('/', function(req, res, next) {
  res.render('index');
});


router.route('/signup')

  .get(function(req, res, next) {
    res.render('signup');
  })

  .post(function(req, res, next) {

    var newUser = new userModel ({
     username: req.body.username,
     email: req.body.email,
     password: req.body.password
      // bcrypt.hash(req.body.password, 10, function(err, hash) {
      //
      // })
    });

    newUser.save(function (error, user) {
      if (error) throw (error);
      res.redirect('/');
    });

});


router.route('/login')

  .get(function(req, res, next) {
    res.render('login');
  })

  .post(function(req, res, next) {

    userModel.find (
      { email: req.body.email, password:req.body.password },
      function (err, users) {
      console.log(req.body)
      res.redirect('/');
    })

});


router.get('/stories/:id', function(req, res, next) {
  res.render('story');
});

router.get('/authors/:id', function(req, res, next) {
  res.render('author');
});

module.exports = router;
module.exports = mongoose.model('users', userModel);
