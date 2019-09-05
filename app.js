var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");


var indexRouter = require('./routes/index');
var lessonsRouter = require('./routes/lessons');
var dateRouter = require('./routes/date');
var aboutRouter = require('./routes/about');
var datepickerRouter = require('./routes/datePicker')
var app = express();

mongoose.Promise = global.Promise;
//connecting to local db
mongoose.connect("mongodb://localhost:27017/DB");

//schema for the user
var userSchema = new mongoose.Schema({
    parentName: String,
    parentEmail: String,
    phone:String,
    kidName:String,
    kidAge:String
});
//schema for the time
var timeSchema = new mongoose.Schema({
    date: String,
    time: String
});

//variable 'User' to reference later
var User = mongoose.model("User", userSchema);
var Time = mongoose.model("Time", timeSchema);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/lessons' , lessonsRouter);
app.use('/date', dateRouter);
app.use('/about', aboutRouter);
app.use('/datePicker',datepickerRouter);

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//Home Route
app.get('/', function(req, res){
    if(err){
      console.log(err);
    } else {
      res.render('index', {

      });
    }
});
//post that data to the database
app.post("/test-page", (req, res) => {
    var myData = new User(req.body);

    myData.save()
        .then(item => {

            res.redirect('/datePicker');

        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

//post date and time info to database
app.post("/dateTime", (req, res) => {
    var myTime = new Time(req.body);

    myTime.save()
        .then( item => {
            res.redirect('/datePicker');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
module.exports = app;
