var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin/index');
});

router.get('/account', function(req, res, next) {
  res.render('admin/account');
});

router.get('/stories/:id', function(req, res, next) {
  res.render('admin/newstory');
});

module.exports = router;
