var express = require('express');
var router = express.Router();
const _LOG_CON = require('../app/controllers/Login_Controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', client_id: 'xxxxxxx' });
})

router.get('/github/callback', _LOG_CON.callback)


module.exports = router;
