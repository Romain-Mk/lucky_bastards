var express = require('express');
var router = express.Router();

// Pour appliquer la condition à l'ensemble des routes :
router.all('/*', function (req, res, next) {
  if (!req.session.userId) {
    res.redirect('/login');
  }
  next(); // pass control to the next handler
});

router.get('/', function(req, res, next) {
  res.render('admin/index');
});

router.get('/account', function(req, res, next) {
  res.render('admin/account');
});

router.get('/stories/:id', function(req, res, next) {
  res.render('admin/story');
});

module.exports = router;
