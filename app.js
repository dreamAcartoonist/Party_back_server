var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//引入数据库配置文件
var mongooseConfig = require('./config/dbconfig')

// var index = require('./routes/index');
var users = require('./routes/users');
// 将后台页面打包到后台接口
var adminPage = require('./routes/adminPage');

//导入后台接口
// var carousels = require('./routes/back/carousels')
// var newseye = require('./routes/back/newseye')
//导入七牛
// var qiniu = require('./controller/upload/qiniu')

var app = express();

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

// app.use('/', index);
app.use('/users', users);
//引用后台页面
app.use('/', adminPage)

//导入和使用controller
app.use('/api',require('./controller/index'))

//使用接口
// app.use('/api/carousels',carousels)
// app.use('/api/newseye',newseye)
//使用七牛
// app.use('/upload',qiniu)

// catch 404 and forward to error handler  捕获404并转发到错误处理程序
app.use(function(req, res, next) {
  var err = new Error('Not Found');   //使用Error构造方法创建自定义的Error对象
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    if (err.name === 'UnauthorizedError') {     //定制自定义报错提示
        res.json({
            data: "登录状态失效,请重新登录",
            code: 401,
            msg: '登录状态失效,请重新登录'
        })
        return
    }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
