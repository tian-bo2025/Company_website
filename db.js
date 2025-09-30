const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 使用 __dirname 拼接绝对路径
// db.js 在 E:\公司网站\ 下，所以直接拼接 mysite.db
const dbPath = path.join(__dirname, 'mysite.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('无法连接数据库:', err.message);
  } else {
    console.log('成功连接数据库:', dbPath);
  }
});

module.exports = db;
