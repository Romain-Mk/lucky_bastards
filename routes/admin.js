var express = require('express');
var router = express.Router();

var storyModel = require('../models/story');

router.get('/', function(req, res, next) {
  // find de la story storyList
  storyModel.find({}, function(err, stories){
    res.render('admin/index', {stories});
  });
});

router.get('/account', function(req, res, next) {
  res.render('admin/account');
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

    newStory.save(function(err, story) {
      res.redirect('/stories/' + story._id);
    });

  });
// End

router.get('/stories/:id', function(req, res, next) {
  storyModel.findOne({_id: req.params.id}, function (error, story) {
    res.render('story', {story});
  });
});

module.exports = router;
