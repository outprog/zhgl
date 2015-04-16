var express = require('express');
var router = express.Router();

var http = require( 'http');
var querystring = require( 'querystring');
var crypto = require( 'crypto');

/* GET home page. */
router.get('/', checkLogin);
router.get('/', function(req, res, next) {
    // 封装用户数据，准备发起远程菜单获取
    var postData = querystring.stringify( {
        'userid' : 
    });
    res.render('index', { title: 'Express' });
});

/* 登陆 */
// 登陆页面
router.get('/login', checkNotLogin);
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
// 登陆验证
router.post('/login', function( req, res) {
    // 密码MD5
    var md5 = crypto.createHash( 'md5');
    var ps_md5 = md5.update( req.body.password || '').digest( 'hex').toUpperCase();
    console.log( ps_md5);

    // 封装数据，准备发起远程访问验证
    var postData = querystring.stringify( {
        'userid' : req.body.userid
    });
    var options = {
      hostname: '10.5.1.203',
      port: 8080,
      path: '/misapp/mis_serve/userlist.jsp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    };

    // 远程获取用户名和密码
    var remote_req = http.request( options, function( remote_res) {
        remote_res.setEncoding( 'binary');
        remote_res.on( 'data', function( chunk) {
            var chunk_json = JSON.parse( chunk);
            try {
                if( chunk_json[0].USER_PASSWORD == ps_md5) {
                    req.session.user = req.body.userid;
                    res.redirect( '/');
                }
            } catch( e) {
                console.log( e);
                res.redirect( '/login');
            }
        });
    });

    // 执行远程访问
    remote_req.write( postData);
    remote_req.end();

    //成功登陆
    //req.session.user = req.body.userid;
    //res.redirect( '/');
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
