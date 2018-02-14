var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth');

router.get('/', (req, res) => {

  auth.logout(req, res);

});

module.exports = router;
