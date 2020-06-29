var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var birdsRouter = require('./routes/birds');
var adminRouter = require('./routes/admin')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/birds', birdsRouter);
// use the router and 401 anything falling through
app.use('/admin', adminRouter, function (req, res, next) {
  console.log('Unauthorized')
  res.sendStatus(401)
})

/*
  To skip the rest of the middleware functions from a router
  middleware stack, call next('route') to pass control to the 
  next route.

  NOTE: next('route') will work only in middleware functions that 
        were loaded by using the app.METHOD() or router.METHOD() 
        functions.
*/
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // send a regular response
  res.send('regular')
})

// handler for the /user/:id path, which sends a special response
app.get('/user/:id', function (req, res, next) {
  res.send('special')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


/**
 * Error-handling middleware always takes four arguments. 
 * You must provide four arguments to identify it as an error-handling 
 * middleware function. Even if you don’t need to use the next object, 
 * you must specify it to maintain the signature. Otherwise, the next 
 * object will be interpreted as regular middleware and will fail to 
 * handle errors.
 */
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
