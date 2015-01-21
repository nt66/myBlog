var flash = require('connect-flash');
var connect = require('connect');
var express = require('express');
var session = require('express-session');
var path = require('path');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
/*app.user 调用中间件*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置Cookie
app.use(cookieParser(settings.db));
//设置Session
app.use(session({
    secret: settings.cookieSecret,
    cookie:{maxAge: 600000},
    /*store:new MongoStore({
        db:settings.db
    }),*/
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

/*app.use 也可以用于判断请求的网址*/
app.use('/', routes);
app.use('/admin', admin);

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
