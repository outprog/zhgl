var express = require('express');
var router = express.Router();

var remote_get = require( '../util/remote_get');

/* GET services listing. */
router.get('/', function(req, res, next) {
  res.send('this is services page');
});

// 返回菜单
router.get('/menus', function( req, res) {
//    remote_get( req.session.user, 'sys_menu', function( d) {
//        res.send( d);
//    });
});

module.exports = router;
