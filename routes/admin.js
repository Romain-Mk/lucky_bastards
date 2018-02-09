var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');
var User = require('../models/user');

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
  res.render('admin/index', {log});
});

router.get('/account', function(req, res, next) {
  res.render('admin/account', {log});
});

// router.post('/account', function(req, res) {
//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//    var profilepic = req.files.profilepic;
//    // Pour l'instant on nomme toutes les images enregistrées img.jpg, après on pourra utiliser req.session.user._id
//    // pour pouvoir renommer l'image en fonction de l'user qui l'a uploadée
//    var userId = req.session.userId;
//    var fileName = userId;
//    // Use the mv() method to place the file somewhere on your server
//    profilepic.mv('./public' + '/images/profilepics/' + fileName + '.jpg' , function(err) {
//      if(err){
//     console.log(err);
//      }else{
//
//        User.update(
//          {_id: userId},
//          {picture: fileName +'.jpg'},
//            function(error, social) {
//              console.log(social)
//                res.render('admin/account', {log});
//      });
//
//     }
//    });
//  });

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


  console.log("tous les id "+ facebook, twitter, instagram, website +" ont été ajoutés");
  console.log(userId);

  // Use the mv() method to place the file somewhere on your server
  profilepic.mv('./public' + '/images/profilepics/' + fileName + '.jpg' , function(err) {
   //  if(err){
   // console.log(err);
   //  }else{

    User.update(
      {_id: userId},
      {picture: fileName +'.jpg', fb: facebook, twitter: twitter, insta: instagram, blog: website},
      function(error, social) {
          console.log(social)
            res.render('admin/account', {log});
          });
  // }
  });

});

router.get('/stories/:id', function(req, res, next) {
  res.render('admin/story', {log});
});

router.get('/delete-account', function(req, res, next) {
  var userId = req.session.userId;

  User.remove(
      {_id: userId},
      function(error) {
        res.render('index', {log});
      }
  );

})

module.exports = router;
