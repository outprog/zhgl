// 获取远程数据
// create by xiongwei

// 配置参数
// hostname 服务器ip
// port 服务器端口
// path 服务路径

// 传参
// userid 用户id
// type 服务类型：password:获取用户密码, sys_menu:获取系统菜单
// callback 回调函数，返回json

var http = require( 'http');
var querystring = require( 'querystring');

function remote_get( userid, type, callback) {

    var data = "";

    // 封装数据，准备发起远程访问
    var postData = querystring.stringify( {
        'userid' : userid,
        'type': type
    });
    var options = {
      hostname: '10.5.1.203',
      port: 8080,
      path: '/misapp/mis_serve/services.jsp',
      method: 'POST',
      headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
            }
    };

    // 获取远程数据
    var remote_req = http.request( options, function( remote_res) {
        remote_res.setEncoding( 'utf-8');


        remote_res.on( 'data', function( chunk) {
            data += chunk;
        });

        remote_res.on( 'end', function() {
            callback( JSON.parse( data));
        });
    });

    // 执行远程访问
    remote_req.write( postData);
    remote_req.end();
}

module.exports = remote_get;
