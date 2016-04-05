var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stormpath = require('express-stormpath');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', stormpath.getUser, function(req, res) {
  res.render('home.jade', {
    title: 'Welcome'
  });
});

app.use(stormpath.init(app, {
  apiKey: {
    id: '4LUK0TVFUHP2QSCTOYZMBBFES',
    secret: 'NDtA29b5JlnN2MPU3++FGjwDdrv3ZlikeFIV9E+JKnA'
  },
  application: {
    href: `https://api.stormpath.com/v1/applications/3qkyBrCwpWnUgbA3phILk3`
  }
}));

app.listen(process.env.PORT);

// Stormpath will let you know when it's ready to start authenticating users.
app.on('stormpath.ready', function () {
  console.log('Stormpath Ready!');
});




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
