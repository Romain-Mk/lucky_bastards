var express = require('express');
var router = express.Router();

var storyModel = require('../models/story');

router.get('/', function(req, res, next) {
  // find all stories
  storyModel.find({}, function(err, stories) {
    res.render('index', {stories});
  })
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

//req.params.id = trouve moi l'élément dont l'id de la BDD correspond à celui qu'on te passe dans l'url
router.get('/stories/:id', function(req, res, next) {
  storyModel.findOne({_id: req.params.id}, function (error, story) {
    res.render('story', {story});
  });
});

router.get('/authors/:id', function(req, res, next) {
  storyModel.find(
    {title: req.body.title, text: req.body.text_zone},
      function (error, stories) {
        res.render('author', {stories, title: req.body.title, text: req.body.text_zone});
      })
});

module.exports = router;
