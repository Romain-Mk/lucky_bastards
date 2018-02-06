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

    userModel.findOne (
      { email: req.body.email, password:req.body.password },
      function (err, users) {
          if(users.length > 0) {
            res.redirect('/')
          } else {
            res.redirect('login');
          }
    })

});


router.get('/stories/:id', function(req, res, next) {
  res.render('story');
});

router.get('/authors/:id', function(req, res, next) {
  res.render('author');
});

module.exports = router;
