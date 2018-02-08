var express = require('express');
var router = express.Router();

var storyModel = require('../models/story');

router.get('/', function(req, res, next) {
  // find de la story storyList
  storyModel.find({}, function(err, stories){
    res.render('admin/index', {storyList: stories});
  })
});

router.get('/account', function(req, res, next) {
  res.render('admin/account');
});

router.post('/mystories/:id', function(req, res, next) {
  console.log("ok route mystories/:id");
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
  newStory.save(
    function(err, stories) {
      storyModel.find(
        {title: req.body.title, text: req.body.text_zone},
          function (error, storyList) {
            res.render('admin/story', {storyList, title: req.body.title, text: req.body.text_zone});
          }
      )
    }
  )
});

router.get('/newstory', function(req, res, next) {
  res.render('admin/newstory');
});

router.get('/mystories/:id/edit', function(req, res, next) {
 res.render('admin/newstory');
});

module.exports = router;
