var express = require('express');
var router = express.Router();
var moment = require('moment');

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

router.get('/', (req, res, next) => {
  Story.find({}).sort({createdAt: -1}).exec((err, stories) => {
    if (err) throw err;
    res.render('index', {stories, moment, log});
  });
});

//req.params.id = trouve moi l'élément dont l'id de la BDD correspond à celui qu'on te passe dans l'url
router.get('/stories/:id', function(req, res, next) {
  Story.findById({_id: req.params.id}, function (error, story) {
    if (error) throw error;
    res.render('story', {story, moment, log});
  });
});

router.get('/authors/:id', function(req, res, next) {
  var id = req.params.id;
  User.findOne({_id: id}, function(error, user) {
    Story.find({authorId: id}).sort({createdAt: -1}).exec(function(error, stories) {
      if (error) throw error;
      res.render('author', {user, stories, moment, log});
    });
  });
});

module.exports = router;
