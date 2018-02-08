var express = require('express');
var router = express.Router();

var storyModel = require('../models/story');

router.get('/', function(req, res, next) {
  // find de la story storyList
  storyModel.find({}, function(err, stories){
    console.log("les stories sont: ", stories);
    res.render('admin/index', {storyList: stories});
  })
});

router.get('/account', function(req, res, next) {
  res.render('admin/account');
});

router.get('/mystories/:id', function(req, res, next) {
  res.render('admin/story');
});

router.route('/newstory')

  .get(function(req, res, next) {
    res.render('admin/newstory');
  })

  .post(function(req, res, next) {
     var newStory = new storyModel ({
       title: req.body.title,
       text: req.body.text_zone,
       img: null,
       tag: null,
       category: null,
       lang: null,
       place: null,
       authorId: null,
       publish: null
      });
    console.log(newStory);

    newStory.save(function (error, story) {
      if (error) throw (error);
      console.log(story);
      res.render('admin/index')
      });

  });



// router.get('/newstory', function(req, res, next) {
//   res.render('admin/newstory');
// });
//
// router.post('/newstory', function(req, res, next) {
//   console.log(req.body);
// });

 //  .post(function(req, res, next) {



 //       res.redirect('/URL SUR LAQUELLE ON REVIENT');
 //     });
 //
 // });

router.get('/mystories/:id/edit', function(req, res, next) {
 res.render('admin/newstory');
});

module.exports = router;
