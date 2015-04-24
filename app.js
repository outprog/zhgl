var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require( 'express-session');
var mongoose = require( 'mongoose');
var MongoStore = require( 'connect-mongo')(session);

var conf = require( './conf');

var routes = require('./routes/index');
var users = require('./routes/users');
var services = require( './routes/services');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// session
app.use( session( {
    name: 'zhgl-session',
    cookie: { originalMaxAge : 48 * 60 * 60 * 1000},
    store: new MongoStore( {
        db: 'zhgl'
    }),
    secret: 'sdv88uhjkl',
    resave: true,
    saveUninitialized: true
}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// locals
app.use( function( req, res, next) {
    res.locals.user = req.session.user;
    res.locals.username = req.session.username;
    res.locals.deptid = req.session.deptid;
    res.locals.conf = conf;
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/services', services);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
