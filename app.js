var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let bodyParser = require('body-parser');
const cors = require("cors");
const Auth = require("./auth");

//import cors from 'cors';

let mongoose = require('mongoose');

require("dotenv").config({ path: './.env' });   
// console.log('secret', process.env.JWT_SECRET)


// Setup server port
var port = process.env.PORT || 8081;

// Send message for default URL
//app.get('/', (req, res) => res.send('Hello World with Express'));

var productRouter = require('./routes/product');
var usersRouter = require('./routes/users');
var cartsRouter = require('./routes/cart');



var app = express();
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
const connection_url = 
'mongodb+srv://ammar:algo@cluster0.iqbpm.mongodb.net/cartdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, { useNewUrlParser: true});
 mongoose.connection.once('open',()=>{
   console.log('DB connected!!!')
 });

// Added check for DB connection



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products',productRouter);
app.use('/users', usersRouter);
app.use('/cart', cartsRouter);

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

app.listen(port, function () {
  //console.log("Running RestHub on port " + port);
});

module.exports = app;
