var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Story = require('../models/story');

var log = false;

// Pour appliquer la condition à l'ensemble des routes :
router.all('/*', function (req, res, next) {

  if (!req.session.userId) {
    log = false;
  } else {
    log = true;
  }

  next(); // pass control to the next handler

});

router.get('/', function(req, res, next) {
  Story.find({}, function(err, stories) {
    res.render('index', {stories, log});
  });
});

//req.params.id = trouve moi l'élément dont l'id de la BDD correspond à celui qu'on te passe dans l'url
router.get('/stories/:id', function(req, res, next) {
  Story.findOne({_id: req.params.id}, function (error, story) {
    res.render('story', {story, log});
  });
});

router.get('/authors/:id', function(req, res, next) {

  User.findOne({_id: req.params.id}, function(error, user) {
    if (error) throw error;
    Story.find({}, function(error, story) {
      if (error) throw error;
      res.render('author', {user, story, log});
    });
  });

});

module.exports = router;
