var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res, next) {
  res.send('sign up');
});

router.get('/login', function(req, res, next) {
  res.send('login');
});

router.get('/stories/:id', function(req, res, next) {
  res.send('fiche story ' + req.params.id);
});

router.get('/authors/:id', function(req, res, next) {
  res.send('fiche author ' + req.params.id);
});

module.exports = router;
