var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var session = require('express-session')
const uuid = require('uuid/v4')
const FileStore = require('session-file-store')(session);
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const routes = require('./app/routes.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  secret: 'f83q4fbqwyfo7q38faifbo47f',
  saveUninitialized: true,
  resave: false,
  store: new FileStore(),
}))
app.use(passport.initialize());
app.use(passport.session());


//app.use('/', indexRouter);
//app.use('/users', usersRouter);
routes(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
