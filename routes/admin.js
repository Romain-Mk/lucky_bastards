var express = require('express');
var router = express.Router();

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

router.get('/stories/:id', function(req, res, next) {
  res.render('admin/story', {log});
});

module.exports = router;
