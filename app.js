var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var employee = require('./routes/employee');
var leads  =   require('./routes/Leads');
var Opportunity = require('./routes/Opportunity');
var workorder  = require('./routes/Workorder');
var invoice    =require('./routes/Invoice');
var app = express();
var connection = require('express-myconnection');
var mysql = require('mysql');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'ssshhhhh'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : 'assyst',
        port : 3306, //port mysql
        database:'crm'
    },'request')
);

app.use('/',employee);
app.use('/lead',leads);
app.use('/Opportunity',Opportunity);
app.use('/Workorder',workorder);
app.use('/Invoice',invoice);
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


app.listen(7070,function()
{
console.log("Listening to port")
});
module.exports = app;
