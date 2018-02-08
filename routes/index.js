var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.userId == undefined) {
    req.session.userId = false;
  }
  res.render('index', {isLogged : req.session.userId} );
});

router.get('/stories/:id', function(req, res, next) {
  res.render('story');
});

router.get('/authors/:id', function(req, res, next) {
  res.render('author');
});

router.get('/logout', function(req, res, next) {
  req.session.userId = false;
  res.redirect('/');
});



module.exports = router;
