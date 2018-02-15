var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');

var User = require('../models/user');
var Story = require('../models/story');

var auth = require('../controllers/auth');

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
  var userId = req.session.userId;
  User.findOne({_id: userId}, function(error, user) {
    if (error) throw error;
    Story.find({authorId: userId}).sort({createdAt: -1}).exec(function(err, stories) {
      if (error) throw error;
      res.render('admin/index', {stories, user, log});
    });
  });
});

// Account
router.route('/account')
  .get((req, res) => {
    res.render('admin/account', {log});
  })
  .post ((req, res) => {

    var userId = req.session.userId;
    var profilepic = req.files.profilepic;
    var picture = null;

    if (profilepic) { // If picture uploaded

      var ext = profilepic.mimetype;

      switch(ext) {
        case 'image/jpeg':
          ext = '.jpg';
          break;
        case 'image/gif':
          ext = '.gif';
          break;
        case 'image/png':
          ext = '.png';
          break;
        default:
          ext = '.jpg';
      }

      picture = userId + ext;

    } else { // If no picture uploaded

      picture = null;

    }

    var data = {
      picture: picture,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      website: req.body.website
    }

    if (profilepic) { // If picture uploaded
      profilepic.mv('./public/images/profilepics/' + data.picture)
        .then (account => {
          updateAccount(userId, data, res);
        })
        .catch(err => {
          res.status(400).json(err);
        });

    } else { // If no picture uploaded
      updateAccount(userId, data, res);
    }

  });

function updateAccount(userId, data, res) {

  User.findByIdAndUpdate({_id: userId}, data)
    .then(account => {
      res.redirect('/admin');
    })
    .catch(err => {
      res.status(400).json(err);
    });

}
// End




router.get('/account/delete', (req, res, next) => {
  User.findOneAndRemove({_id: req.session.userId}, (error, user) => {
    if (error) throw error;
    auth.logout(req, res);
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
      authorId: req.session.userId,
      authorName: req.session.userName,
      authorPicture: req.session.userPicture
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

module.exports = router;
