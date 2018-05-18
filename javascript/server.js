// Import all modules from seperate files that are required
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/conversion-website');

// Body parser parses HTTP request body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Redirect weight api requests to route/weight.js
var Weight = require('./route/weight');
app.use('/api/weight', Weight);

// Redirect length api requests to route/length.js
var Length = require('./route/length');
app.use('/api/length', Length);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// Listen to port 3000
app.listen(3000, function () {
//	console.log("Conversion website running on port 3000");
});


module.exports = app;
