var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var cors = require('cors')

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8000);


// catch 404 and forward to error handler


var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://nccucs:nccucs@cluster0-67gm7.mongodb.net/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function callback () {
  console.log("Database Connected.");
});

let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: 'asdfasfiqfvkashgvk',
    saveUninitialized: false,   // don't create session until something stored
    resave: false,              //don't save session if unmodified
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));


app.use('/', index);
app.use('/users', users);
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

module.exports = app;
