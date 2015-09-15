var express = require('express');
var paper = require('paper');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var routes = require('./routes/index');
var users = require('./routes/users');
var Level = require('./models/level');
var app = express();
mongoose.connect('mongodb://localhost/candusenhub');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//console.dir(paper.Path)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);
app.listen(3000)

/*n = new Level({
  name: Math.random().toString(),
  walls: [
    [[0,60],[80,80]],
    [[0,30],[80,50]],
    [[10,70],[10,80]]
     ],
     ballStart: [20,7],
  hole: [95,95],
  hazards:  [{
    segments:[[25,10],[0,75],[40,10]],
    fillColor: 'blue',
    closed:true
    }, {
    segments:[[42,45],[90,48],[94,90],[42,90]],
    fillColor: 'yellow',
    closed:true
}],
});
n.save()*/

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
