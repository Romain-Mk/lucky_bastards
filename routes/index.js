var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res, next) {
  res.send('accueil sign up');
});

router.get('/login', function(req, res, next) {
  res.send('accueil login');
});

router.get('/stories/:id', function(req, res, next) {
  res.send('accueil stories ' + req.params.id);
});

router.get('/author/:id', function(req, res, next) {
  res.send('accueil ta race ' + req.params.id);
});

module.exports = router;
