var express = require('express');
var router = express.Router();

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
  res.render('index', {log});
});

router.get('/stories/:id', function(req, res, next) {
  res.render('story', {log});
});

router.get('/authors/:id', function(req, res, next) {
  res.render('author', {log});
});

module.exports = router;
