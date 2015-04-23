var express = require('express');
var router = express.Router();

var http = require( 'http');
var querystring = require( 'querystring');
var crypto = require( 'crypto');

var remote_get = require( '../util/remote_get');


/* GET home page. */
router.get('/', checkLogin);
router.get('/', function( req, res, next) {
    // 远程获取菜单数据
    remote_get( req.session.user, 'sys_menu', function( menu) {
        res.render( 'index', { menu_list: menu});
    });

});

/* 登陆 */
// 登陆页面
router.get('/login', checkNotLogin);
router.get('/login', function(req, res, next) {
  res.render('login');
});
// 登陆验证
router.post('/login', function( req, res) {
    // 密码MD5
    var md5 = crypto.createHash( 'md5');
    var ps_md5 = md5.update( req.body.password || '').digest( 'hex').toUpperCase();
    //console.log( ps_md5);

    // 获取远程数据并验证密码
    remote_get( req.body.userid, 'password', function( d) {
        try {
            if( d[0].USER_PASSWORD == ps_md5) {
                req.session.user = req.body.userid;
                req.session.username = d[0].USER_NAME;
                req.session.deptid = d[0].DEPT_ID;
                ////////////////////////////?????
                console.log( d[0].DEPT_ID);
                res.redirect( '/');
            }
        } catch( e) {
            console.log( e);
            res.redirect( '/login');
        }
    });
});
// 登陆注销
router.get('/logout', function( req, res) {
    req.session.destroy( function( err) {
        res.redirect( '/login');
    });
});

//check Login State
function checkLogin ( req, res, next) {
    if( !req.session.user) {
        return res.redirect( '/login');
    }
    next();
}
function checkNotLogin( req, res, next) {
    if( req.session.user) {
        return res.redirect( '/');
    }
    next();
}


module.exports = router;
