// 获取远程数据
// create by xiongwei

// conf 配置参数
// hostname 服务器ip
// port 服务器端口
// path 服务路径

/* // 传参
   data:    {   userid: req.session.user,
                type: 'sys_menu'
            }
   opt:     {
                path: '/mis_serve/services.jsp'
            }
   type:服务类型：user:获取用户密码, sys_menu:获取系统菜单
   path:子服务路径
   callback 回调函数，返回json
*/

var http = require( 'http');
var querystring = require( 'querystring');
var conf = require( '../conf');

function remote_get( data, opt, callback) {

    var res = "";

    // 封装数据，准备发起远程访问
    var postData = querystring.stringify( {
        'userid' : data.userid,
        'type': data.type
    });
    var options = {
      hostname: conf.remote_service.hostname,
      port: conf.remote_service.port,
      path: conf.remote_service.path + opt.path,
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
            res += chunk;
        });

        remote_res.on( 'end', function() {
            callback( JSON.parse( res));
        });
    });

    // 执行远程访问
    remote_req.write( postData);
    remote_req.end();
}

module.exports = remote_get;
