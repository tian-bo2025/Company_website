const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express();

// 端口
const PORT = process.env.PORT || 3000;

// 视图和静态文件
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// body解析
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// session配置
app.use(session({
    secret: '宝诗珠宝123',
    resave: false,
    saveUninitialized: true,
}));

// SQLite数据库路径（绝对路径）
const dbPath = path.resolve(__dirname, 'mysite.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('数据库连接失败:', err.message);
    } else {
        console.log('数据库已连接:', dbPath);
    }
});

// 将db挂载到req
app.use((req, res, next) => {
    req.db = db;
    next();
});

// 路由
app.use('/', indexRouter);

// 启动
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
