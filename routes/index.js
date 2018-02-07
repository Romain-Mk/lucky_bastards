var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/stories/:id', function(req, res, next) {
  res.render('story');
});

router.get('/authors/:id', function(req, res, next) {
  res.render('author');
});

module.exports = router;
