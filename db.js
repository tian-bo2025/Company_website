const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// 拼接数据库路径（保证无论本地还是 Railway 都能找到）
const dbPath = path.join(__dirname, "mysite.db");

// 连接数据库
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("数据库连接失败:", err.message);
  } else {
    console.log("成功连接到 SQLite 数据库");
    console.log("数据库已连接：", dbPath);
  }
});

module.exports = db;
