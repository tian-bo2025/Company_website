// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'mysite.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('无法连接到数据库', err.message);
  } else {
    console.log('成功连接到 SQLite 数据库');
  }
});

module.exports = db;
