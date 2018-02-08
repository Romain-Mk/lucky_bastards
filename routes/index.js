var express = require('express');
var router = express.Router();

var storyModel = require('../models/story');

router.get('/', function(req, res, next) {
  // find de la story storyList
  storyModel.find({}, function(err, stories){
    console.log("les stories sont: ", stories);
    res.render('index', {storyList: stories});
  })
});

// router.get('/', function(req, res, next) {
//   res.render('index');
// });

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/stories/:id', function(req, res, next) {
  res.render('story');
});

router.get('/authors/:id', function(req, res, next) {
  res.render('author');
});

module.exports = router;
