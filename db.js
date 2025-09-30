const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// 使用 __dirname 拼接绝对路径
const dbPath = path.join(__dirname, "mysite.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("数据库连接失败:", err.message);
  } else {
    console.log("数据库已连接：", dbPath);
  }
});

module.exports = db;
