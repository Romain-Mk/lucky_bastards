var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('admin liste user stories');
});

router.get('/account', function(req, res, next) {
  res.send('user infos');
});

router.get('/stories/:id', function(req, res, next) {
  res.send('fiche story ' + req.params.id);
});

module.exports = router;
