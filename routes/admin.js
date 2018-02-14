var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');

var User = require('../models/user');
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

  User.findOne({_id: req.session.userId}, function(error, user) {
    if (error) throw error;
    Story.find({}, function(err, stories){
      if (error) throw error;
      res.render('admin/index', {stories, user, log});
    });
  });

});

router.get('/account', function(req, res, next) {
  res.render('admin/account', {log});
});

router.post ('/account', function(req, res) {
  var facebook = req.body.facebook;
  var twitter = req.body.twitter;
  var instagram = req.body.instagram;
  var website = req.body.website;
  var userId = req.session.userId;

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  var profilepic = req.files.profilepic;
  // Pour l'instant on nomme toutes les images enregistrées img.jpg, après on pourra utiliser req.session.user._id
  // pour pouvoir renommer l'image en fonction de l'user qui l'a uploadée
  var fileName = userId;

  // Use the mv() method to place the file somewhere on your server
  profilepic.mv('./public' + '/images/profilepics/' + fileName + '.jpg' , function(err) {

    User.update(
      {_id: userId},
      {picture: fileName + '.jpg', fb: facebook, twitter: twitter, insta: instagram, blog: website},
      function(error, social) {
        res.render('admin/account', {log});
      });
  });

});

// New story
router.route('/newstory')
  .get(function(req, res, next) {
    res.render('admin/newstory', {log});
  })
  .post(function(req, res, next) {

    var newStory = new Story ({
      title: req.body.title,
      text: req.body.text_zone,
      img: null,
      authorId: req.session.userId
    });

    newStory.save(function(err, story) {
      res.redirect('/admin');
    });
  });
// End

router.get('/stories/:id', function(req, res, next) {
  Story.findOne({_id: req.params.id}, function (error, story) {
    res.render('admin/story', {story, log});
  });
});

router.get('/delete-account', function(req, res, next) {
  var userId = req.session.userId;
  User.remove({_id: userId}, function(error) {
    res.render('index', {log});
  });
});

module.exports = router;
