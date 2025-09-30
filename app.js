// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// 路由
const indexRouter = require('./routes/index');

// 数据库
const db = require('./db');

const app = express();

// 设置视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session 配置
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// 使用路由
app.use('/', indexRouter);

// 错误处理
app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

// 监听端口
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`SQLite connected at: ${path.join(__dirname, 'mysite.db')}`);
});
