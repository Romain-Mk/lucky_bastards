var express = require('express');
var router = express.Router();

var Story = require('../models/story');

var log = false;

// Pour appliquer la condition à l'ensemble des routes :
router.all('/*', function (req, res, next) {

  if (!req.session.userId) {
    log = false;
    res.redirect('/login');
  } else {
    log = true;
  }

  next(); // pass control to the next handler

});

router.get('/', function(req, res, next) {
  Story.find({}, function(err, stories){
    res.render('admin/index', {stories}, {log});
  });
});

router.get('/account', function(req, res, next) {
  res.render('admin/account', {log});
});

// New story action
router.route('/newstory')

  .get(function(req, res, next) {
    res.render('admin/newstory');
  })

  .post(function(req, res, next) {

    var newStory = new storyModel ({
      tag: null,
      category: null,
      title: req.body.title,
      text: req.body.text_zone,
      img: null,
      lang: null,
      place: null,
      authorId: null,
      publish: null
    });

    Story.save(function(err, story) {
      res.redirect('/stories/' + story._id);
    });

  });
// End

router.get('/stories/:id', function(req, res, next) {
  Story.findOne({_id: req.params.id}, function (error, story) {
    res.render('story', {story}, {log});
  });
});

module.exports = router;
